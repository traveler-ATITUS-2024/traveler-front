import React from "react";
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
import ViagemService from "../../services/ViagemService";

import flechaesquerda from "../../../assets/flechaesquerda.png";
import logo from "../../../assets/logo.png";
import calendarioida from "../../../assets/calendarioida.png";
import calendariovolta from "../../../assets/calendariovolta.png";
import marcacaomapa from "../../../assets/marcacaomapa.png";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

// Receba `navigation` como uma prop
export default function CadastroViagem({ navigation }) {
  const service = ViagemService();

  return (
    <TouchableWithoutFeedback onPress={service.ocultarTecladoECalendario}>
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
            value={service.tituloViagem}
            placeholder="Título da viagem:"
            placeholderTextColor="#888"
            onChangeText={service.setTituloViagem}
          />
        </View>

        <View style={styles.datas}>
          <TouchableOpacity
            onPress={() => service.acaoCalendario("ida")}
            style={styles.dataContainer}
          >
            <Image source={calendarioida} style={styles.iconecalendario} />
            <Text style={styles.textoDatas}>
            {service.formatarData(service.dataIda, "ida")}
            </Text>
          </TouchableOpacity>

          {service.calendarioVisivel.ida && (
            <Calendar
              style={styles.calendario}
              theme={styles.temacalendario}
              minDate={new Date().toDateString()}
              onDayPress={(day) =>
                service.salvaDataIda(new Date(day.dateString))
              }
            />
          )}

          <TouchableOpacity
            onPress={() => service.acaoCalendario("volta")}
            style={styles.dataContainer}
          >
            <Image source={calendariovolta} style={styles.iconecalendario} />
            <Text style={styles.textoDatas}>
            {service.formatarData(service.dataVolta, "volta")}
            </Text>
          </TouchableOpacity>

          {service.calendarioVisivel.volta && (
            <Calendar
              style={styles.calendario}
              theme={styles.temacalendario}
              minDate={new Date().toDateString()}
              onDayPress={(day) =>
                service.salvaDataVolta(new Date(day.dateString))
              }
            />
          )}
        </View>

        <View style={styles.cidadeContainer}>
          <Image source={marcacaomapa} style={styles.iconecalendario} />
          <Text style={styles.cidadeTexto}>
            {service.cidade ? service.cidade : "Nenhuma cidade selecionada"}
          </Text>
        </View>

        <View style={styles.gastoContainer}>
            <Text style={styles.gastoLabel}>Gasto previsto:</Text>
            <TextInput
              style={styles.inputGasto}
              value={service.gastoPrevisto}
              onChangeText={service.formataValorInserido}
              keyboardType="numeric"
              placeholderTextColor="#FFFF"
            />
        </View>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={service.addViagemDadosSalvos}
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
