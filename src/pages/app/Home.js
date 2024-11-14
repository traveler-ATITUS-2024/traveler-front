import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import fundomenu from "../../../assets/fundomenu.png";
import PlacesAutocomplete from "./PlacesAutocomplete";
import calendarioida from "../../../assets/calendarioida.png";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function Viagem({ navigation }) {
  const [mostraModal, setMostraModal] = useState(false);
  const { token } = useAuth();
  const [temViagem, setTemViagem] = useState(false);

  const abreModal = () => {
    setMostraModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.titulo}>traveler</Text>

      {temViagem ? (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.tituloViagem}>Férias em Gramado</Text>
            <View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Atual</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <Ionicons name="wallet-outline" size={20} color="green" />
            <Text style={styles.moneyTextGray}>1.234 </Text>
            <Text style={styles.moneyText}>/ R$ 5.000</Text>

            <View style={{ flex: 1 }} />

            <Ionicons
              name="calendar-outline"
              size={20}
              color="white"
              style={styles.dateIcon}
            />
            <Text style={styles.dateText}>12/09/2024</Text>
          </View>
        </View>
      ) : (
        <View style={styles.view}>
          <Image source={fundomenu} style={styles.imagemfundomenu} />
          <Text style={styles.texto}>Qual seu próximo destino?</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setMostraModal(true)}
          >
            <Text style={styles.textobotao}>+ Adicionar nova viagem</Text>
          </TouchableOpacity>

          <Modal visible={mostraModal} animationType="fade" transparent={true}>
            <PlacesAutocomplete
              navigation={navigation}
              fechar={() => setMostraModal(false)}
            />
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 98,
    height: 83,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    letterSpacing: 6.2,
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#FFF",
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imagemfundomenu: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  texto: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#0E6EFF",
    width: 315,
    height: 51,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 140,
  },
  textobotao: {
    color: "#FFF",
    fontSize: 18,
  },
  icon: {
    width: 30,
    height: 30,
  },
  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: "90%",
    marginTop: 5,
  },
  dateIcon: {
    marginRight: 5,
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#071222",
    marginTop: 50,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: "90%",
    height: "15%",
  },
  tituloViagem: {
    fontSize: 20,
    color: "white",
    marginBottom: 8,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusBadge: {
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  moneyTextGray: {
    color: "gray",
    fontSize: 16,
    marginLeft: 8,
  },
  moneyText: {
    color: "white",
    fontSize: 16,
  },
});
