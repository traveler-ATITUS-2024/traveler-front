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
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CurrencyInput from "react-native-currency-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";
import flechaesquerda from "../../../assets/flechaesquerda.png";
import calendario from "../../../assets/calendario.png";
import relogio from "../../../assets/relogio.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { adicionarDespesa } from "../../services/gastosService";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

dayjs.extend(utc);
const categorias = [
  { label: "Alimentação", value: 1 },
  { label: "Hospedagem", value: 2 },
  { label: "Transporte", value: 3 },
  { label: "Compras", value: 4 },
  { label: "Ingressos", value: 5 },
  { label: "Seguro e Documentação", value: 6 },
  { label: "Saúde e bem-estar", value: 7 },
  { label: "Outros", value: 8 },
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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nomeGasto, setNomeGasto] = useState("");
  const [categoriaModalVisivel, setCategoriaModalVisivel] = useState(false);

  const adicionarNovaDespesa = async () => {
    try {
      setIsLoading(true);

      if (!dataGasto || !horaGasto || !nomeGasto || !categoriaSelecionada) {
        Alert.alert("Por favor, preencha todas as informações.");
        return;
      }

      const response = await adicionarDespesa(
        viagem.id,
        categoriaSelecionada,
        nomeGasto,
        dataGasto,
        horaGasto,
        valorDespesa,
        token
      );

      if (response) {
        navigation.navigate("MeusGastos", { viagem });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              : "Selecione a data"}
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
              onPress={() => {}}
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
              onPress={() => {}}
            >
              <DateTimePicker
                value={horaGasto ? new Date(horaGasto) : new Date()}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    setHoraGasto(dayjs(selectedTime).utcOffset(-3).toDate());
                    {
                      Platform.OS != "ios" && setRelogioVisivel(false);
                    }
                  }
                }}
              />
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => setRelogioVisivel(false)}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <View style={styles.tituloContainer}>
          <TextInput
            value={nomeGasto}
            onChangeText={setNomeGasto}
            style={styles.tituloInput}
            placeholder="Título da despesa:"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.dividerNome} />

        <TouchableOpacity
          onPress={() => setCategoriaModalVisivel(true)}
          style={styles.categoriaContainer}
        >
          <Text style={styles.textoCategoria}>
            {categoriaSelecionada
              ? categorias.find(
                  (categoria) => categoria.value === categoriaSelecionada
                )?.label
              : "Selecione a Categoria"}
          </Text>

          <MaterialIcons
            name="arrow-drop-down"
            size={28}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>

        <Modal
          visible={categoriaModalVisivel}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCategoriaModalVisivel(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setCategoriaModalVisivel(false)}
            activeOpacity={1}
          >
            <View style={styles.modalContentCategoria}>
              {categorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria.value}
                  onPress={() => {
                    setCategoriaSelecionada(categoria.value);
                    setCategoriaModalVisivel(false);
                  }}
                  style={styles.categoriaOption}
                >
                  <Text style={styles.textoCategoriaOption}>
                    {categoria.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity
          style={
            isLoading ? styles.botaoAdicionarDisable : styles.botaoAdicionar
          }
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
    </TouchableWithoutFeedback>
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
  descricaoContainer: {
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
    marginLeft: "2%",
  },
  inputGasto: {
    color: "#999",
    fontSize: 26,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
    marginRight: "2%",
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
    backgroundColor: "#00050D",
    borderRadius: 10,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  modalContentCategoria: {
    backgroundColor: "#00050D",
    width: "85%",
    borderRadius: 15,
    padding: 20,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  categoriaOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textoCategoriaOption: {
    fontSize: 18,
    color: "#fff",
  },
  textoCategoria: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
  },
  confirmButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#071222",
    justifyContent: "center",
  },
  iconContainer: {
    top: 14,
  },
  picker: {
    color: "#FFF",
    marginLeft: 6,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingLeft: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
  icon: {
    marginRight: 10,
  },
  botaoAdicionar: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: "88%",
  },
  botaoAdicionarDisable: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    top: "88%",
    opacity: 0.6,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
