import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CurrencyInput from "react-native-currency-input";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";
import flechaesquerda from "../../../assets/flechaesquerda.png";
import calendario from "../../../assets/calendario.png";
import relogio from "../../../assets/relogio.png";
import dayjs from "dayjs";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";
import utc from "dayjs/plugin/utc";
import { adicionarDespesa } from "../../services/gastosService";
import { useRoute } from "@react-navigation/native";

dayjs.extend(utc);

const categorias = [
  { id: 1, nome: "Alimentação" },
  { id: 2, nome: "Hospedagem" },
  { id: 3, nome: "Transporte" },
  { id: 4, nome: "Compras" },
  { id: 5, nome: "Ingressos" },
  { id: 6, nome: "Seguro e Documentação" },
  { id: 7, nome: "Saúde e bem-estar" },
  { id: 8, nome: "Outros" },
];

export default function CadastroDespesa({ navigation }) {
  const route = useRoute();
  const { viagem } = route.params;
  const { token } = useAuth();
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [relogioVisivel, setRelogioVisivel] = useState(false);
  const [dataGasto, setDataGasto] = useState(null);
  const [horaGasto, setHoraGasto] = useState(() => {
    const dataAtual = new Date();
    const dataFuso = new Date(dataAtual.getTime() - 3 * 60 * 60 * 1000);
    return dataFuso.toISOString();
  });
  const [valorDespesa, setValorDespesa] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nomeGasto, setNomeGasto] = useState("");

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime
      ? dayjs(selectedTime).utcOffset(-3).toDate()
      : horaGasto;
    setRelogioVisivel(false);
    setHoraGasto(currentTime);
  };

  const adicionarNovaDespesa = async () => {
    try {
      setIsLoading(true);
      const response = await adicionarDespesa(
        viagem.id,
        categoriaSelecionada,
        nomeGasto,
        dataGasto,
        valorDespesa,
        token
      );

      if (response) {
        navigation.navigate("MeusGastos", { viagem });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

      <View style={styles.gastoContainer}>
        <Text style={styles.gastoLabel}>Valor :</Text>
        <CurrencyInput
          style={styles.inputGasto}
          value={valorDespesa}
          onChangeValue={setValorDespesa}
          keyboardType="numeric"
          prefix="R$ "
        />
      </View>
      <View style={styles.divider} />

      <TouchableOpacity
        onPress={() => setCalendarioVisivel(true)}
        style={styles.dataContainer}
      >
        <Image source={calendario} style={styles.iconecalendario} />
        <Text style={styles.textoData}>
          {dataGasto
            ? dayjs(dataGasto).format("DD/MM/YYYY")
            : "Data do gasto"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={calendarioVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarioVisivel(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setCalendarioVisivel(false)}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => { }}
          >
            <Calendar
              style={styles.calendario}
              theme={styles.temacalendario}
              minDate={new Date().toDateString()}
              onDayPress={(day) => {
                setDataGasto(dayjs(day.dateString).toISOString());
                setCalendarioVisivel(false);
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        onPress={() => setRelogioVisivel(true)}
        style={styles.horaContainer}
      >
        <Image source={relogio} style={styles.iconerelogio} />
        <Text style={styles.textoHora}>
          {horaGasto ? dayjs(horaGasto).format("HH:mm") : "Horário do gasto"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={relogioVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRelogioVisivel(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setRelogioVisivel(false)}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => { }}
          >
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onChangeTime}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View style={styles.tituloContainer}>
        <TextInput
          value={nomeGasto}
          onChangeText={setNomeGasto}
          style={styles.tituloInput}
          placeholder="Nome do gasto:"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.dividerNome} />

      <View style={styles.categoriaContainer}>
        <RNPickerSelect
          onValueChange={(value) => setCategoriaSelecionada(value)}
          items={categorias.map((item) => ({
            label: item.nome,
            value: item.id,
          }))}
          placeholder={{
            label: "Selecione uma categoria",
            value: null,
            color: "#888",
          }}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
            iconContainer: styles.iconContainer,
            placeholder: { color: "#FFF" },
          }}
          Icon={() => (
            <Icon name="chevron-down" size={20} color="#FFF"
              style={{ marginHorizontal: 16, }}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={isLoading ? styles.botaoAdicionarDisable : styles.botaoAdicionar}
        onPress={adicionarNovaDespesa}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>+ Adicionar</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    paddingHorizontal: 10,
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
  },
  divider: {
    height: 1,
    backgroundColor: "#888",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  dividerNome: {
    height: 1,
    backgroundColor: "#888",
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
  },
  tituloInput: {
    color: "#FFF",
    fontSize: 20,
    paddingVertical: 10,
  },
  gastoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  gastoLabel: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: '2%',
  },
  inputGasto: {
    color: "#999",
    fontSize: 26,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
    marginRight: '2%',
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 16,
    height: 50, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    height: 300,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  calendario: {
    width: 300,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  temacalendario: {
    calendarBackground: "#fff",
    todayTextColor: "#FFFFFF",
    todayBackgroundColor: "#0E6EFF",
    selectedDayBackgroundColor: "#888",
    selectedDayTextColor: "#888",
    arrowColor: "#0E6EFF",
    monthTextColor: "#0E6EFF",
  },
  textoData: {
    color: "#fff",
    fontSize: 18,
  },
  iconecalendario: {
    width: 32, 
    height: 32,
    marginRight: 10, 
  },
  iconerelogio: {
    width: 32, 
    height: 32,
    marginRight: 10, 
  },
  horaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 16,
    height: 50, 
  },
  textoHora: {
    color: "#fff",
    fontSize: 18,
  },
  categoriaContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#071222",
    justifyContent: 'center',
  },
  iconContainer: {
    top: 14,
  },
  picker: {
    color: "#FFF",
    marginLeft: 6,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingLeft: 16,
    fontSize: 16
  },
  botaoAdicionar: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: '88%',
  },
  botaoAdicionarDisable: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: '88%',
    opacity: 0.6,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
