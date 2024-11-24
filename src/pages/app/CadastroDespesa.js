import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
  Platform,
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

export default function CadastroDespesa({ navigation, route }) {
  const { token } = useAuth();
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [relogioVisivel, setRelogioVisivel] = useState(false);
  const [dataGasto, setDataGasto] = useState(null);
  const [horaGasto, setHoraGasto] = useState(new Date());
  const [valorDespesa, setValorDespesa] = useState(0);

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || horaGasto;
    setRelogioVisivel(false);
    setHoraGasto(currentTime);
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
          placeholderTextColor="#FFF"
          prefix="R$ "
        />
      </View>

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
          {horaGasto != Date() ? dayjs(horaGasto).format("HH:mm") : "Horário do gasto"}
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
              value={horaGasto}
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
          style={styles.tituloInput}
          placeholder="Título do gasto:"
          placeholderTextColor="#888"
        />
      </View>
    </View>
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
    borderBottomWidth: 2,
    borderBottomColor: "#888",
    color: "#888",
    fontSize: 20,
    paddingVertical: 10,
  },
  gastoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#888",
  },
  gastoLabel: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  inputGasto: {
    color: "#999",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    marginHorizontal: 16,
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
    width: 36,
    height: 36,
    marginRight: 8,
  },
  horaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 16,
  },
  textoHora: {
    color: "#fff",
    fontSize: 18,
  },
  iconerelogio: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
});
