import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../utils/estilocalendario";
import CurrencyInput from "react-native-currency-input";

import { useAuth } from "../../context/AuthContext";
import flechaesquerda from "../../../assets/flechaesquerda.png";
import logo from "../../../assets/logo.png";
import calendarioida from "../../../assets/calendarioida.png";
import calendariovolta from "../../../assets/calendariovolta.png";
import marcacaomapa from "../../../assets/marcacaomapa.png";
import { adicionarViagem } from "../../services/ViagemService";
import dayjs from "dayjs";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function CadastroViagem({ navigation, route }) {
  const { token } = useAuth();
  const [calendarioVisivel, setCalendarioVisivel] = useState({
    ida: false,
    volta: false,
  });
  const [tituloViagem, setTituloViagem] = useState("");
  const [dataIda, setDataIda] = useState(null);
  const [dataVolta, setDataVolta] = useState(null);
  const [cidade, setCidade] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [gastoPrevisto, setGastoPrevisto] = useState(0);
  const [gastoReal, setGastoReal] = useState(0);

  const cidadeSelecionada = route?.params?.cidadeSelecionada;

  useEffect(() => {
    if (cidadeSelecionada) {
      const descricaoCidade =
        cidadeSelecionada.description || cidadeSelecionada.formatted_address;
      const latitude = cidadeSelecionada.geometry?.location?.lat;
      const longitude = cidadeSelecionada.geometry?.location?.lng;

      setCidade(descricaoCidade);
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }, [cidadeSelecionada]);

  const adicionarNovaViagem = async () => {
    try {
      const response = await adicionarViagem(
        tituloViagem,
        dataIda,
        dataVolta,
        gastoPrevisto,
        gastoReal,
        latitude,
        longitude,
        token
      );
    } catch (error) {
      console.error(error);
    }
  };

  // const definirCidade = (cidadeSelecionada) => {
  //   if (!cidadeSelecionada) {
  //     console.log("Nenhuma cidade selecionada");
  //     return;
  //   }

  //   const descricaoCidade =
  //     cidadeSelecionada.description || cidadeSelecionada.formatted_address;
  //   const latitude = cidadeSelecionada.geometry?.location?.lat;
  //   const longitude = cidadeSelecionada.geometry?.location?.lng;

  //   setCidade(descricaoCidade);
  //   setCoordenadas({ latitude, longitude });

  //   console.log(`Cidade ${descricaoCidade} selecionada com sucesso`, {
  //     latitude,
  //     longitude,
  //   });
  // };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.flechaContainer}
          >
            <Image
              source={flechaesquerda}
              style={[styles.flecha, { tintColor: "#FFFF" }]}
            />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.tituloContainer}>
          <TextInput
            style={styles.tituloInput}
            value={tituloViagem}
            placeholder="Título da viagem:"
            placeholderTextColor="#888"
            onChangeText={setTituloViagem}
          />
        </View>

        <View style={styles.datas}>
          <TouchableOpacity
            onPress={() =>
              setCalendarioVisivel({
                ida: !calendarioVisivel.ida,
                volta: false,
              })
            }
            style={styles.dataContainer}
          >
            <Image source={calendarioida} style={styles.iconecalendario} />
            <Text style={styles.textoDatas}>
              {dataIda ? dayjs(dataIda).format("DD/MM/YYYY") : "Data de ida"}
            </Text>
          </TouchableOpacity>

          {calendarioVisivel.ida && (
            <Calendar
              style={styles.calendario}
              theme={styles.temacalendario}
              minDate={new Date().toDateString()}
              onDayPress={(day) =>
                setDataIda(new Date(day.dateString).toISOString())
              }
            />
          )}

          <TouchableOpacity
            onPress={() =>
              setCalendarioVisivel({
                ida: false,
                volta: !calendarioVisivel.volta,
              })
            }
            style={styles.dataContainer}
          >
            <Image source={calendariovolta} style={styles.iconecalendario} />
            <Text style={styles.textoDatas}>
              {dataVolta
                ? dayjs(dataVolta).format("DD/MM/YYYY")
                : "Data de volta"}
            </Text>
          </TouchableOpacity>

          {calendarioVisivel.volta && (
            <Calendar
              style={styles.calendario}
              theme={styles.temacalendario}
              minDate={new Date().toDateString()}
              onDayPress={(day) =>
                setDataVolta(new Date(day.dateString).toISOString())
              }
            />
          )}
        </View>

        <View style={styles.cidadeContainer}>
          <Image source={marcacaomapa} style={styles.iconecalendario} />
          <Text style={styles.cidadeTexto}>
            {cidade ? cidade : "Nenhuma cidade selecionada"}
          </Text>
        </View>

        <View style={styles.gastoContainer}>
          <Text style={styles.gastoLabel}>Gasto previsto:</Text>
          <CurrencyInput
            style={styles.inputGasto}
            value={gastoPrevisto}
            onChangeValue={setGastoPrevisto}
            keyboardType="numeric"
            placeholderTextColor="#FFFF"
            prefix="R$"
          />
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarNovaViagem}
        >
          <Text style={styles.textoBotao}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 80,
    paddingHorizontal: 16,
  },
  flechaContainer: {
    position: "absolute",
    left: 16,
  },
  logo: {
    width: 98,
    height: 83,
  },
  flecha: {
    width: 30,
    height: 30,
  },
  tituloContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  tituloInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    color: "#888",
    fontSize: 16,
    paddingVertical: 4,
  },
  datas: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconecalendario: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textoDatas: {
    color: "#fff",
    fontSize: 16,
  },
  cidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  cidadeTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
  cidadeNegrito: {
    fontWeight: "bold",
  },
  gastoContainer: {
    marginTop: 50,
  },
  gastoLabel: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  inputGasto: {
    color: "#999",
    fontSize: 30,
    fontWeight: "bold",
  },
  botaoAdicionar: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 120,
    marginBottom: 40,
    marginLeft: 140,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
