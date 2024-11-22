import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import fundomenu from "../../../assets/fundomenu.png";
import PlacesAutocomplete from "./PlacesAutocomplete";
import calendarioida from "../../../assets/calendarioida.png";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import { buscarViagens } from "../../services/HomeService";
import { useFocusEffect } from "@react-navigation/native";

export default function Viagem({ navigation }) {
  const [mostraModal, setMostraModal] = useState(false);
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const [temViagem, setTemViagem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viagens, setViajens] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      buscaMinhasViagens();
    }, [])
  );

  const buscaMinhasViagens = async () => {
    try {
      setLoading(true);
      const response = await buscarViagens(decoded.id, token);

      if (response && response.length > 0) {
        setTemViagem(true);
        setViajens(response);
      } else {
        setTemViagem(false);
      }
    } catch (error) {
      setTemViagem(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.titulo}>traveler</Text>

      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#fff" />
      ) : temViagem ? (
        <>
          {viagens
            .slice()
            .sort((a, b) => b.id - a.id)
            .slice(0, 3)
            .map((viagem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("DetalhesViagem", { viagem })
                }
              >
                <View style={styles.row}>
                  <Text style={styles.tituloViagem}>
                    {viagem.nome.length > 25
                      ? `${viagem.nome.substring(0, 25)}...`
                      : viagem.nome}
                  </Text>
                  <View>
                    <View
                      style={[
                        styles.statusBadge,
                        viagem.statusId === 1
                          ? styles.statusBadgeAtual
                          : styles.statusBadgeFinalizada,
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {viagem.statusId === 1 ? "Atual" : "Finalizada"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.detailsRow}>
                  <Ionicons name="wallet-outline" size={20} color="#80F04E" />
                  <Text style={styles.moneyTextGray}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    }).format(viagem.valorPrv)}{" "}
                  </Text>
                  <Text style={styles.moneyText}>
                    /{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(viagem.valorReal)}{" "}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="white"
                    style={styles.dateIcon}
                  />
                  <Text style={styles.dateText}>
                    {dayjs(viagem.dataIda).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() => setMostraModal(true)}
          >
            <Text style={styles.textoBotaoAdd}>+ Adicionar</Text>
          </TouchableOpacity>
          <Modal visible={mostraModal} animationType="fade" transparent={true}>
            <PlacesAutocomplete
              navigation={navigation}
              fechar={() => setMostraModal(false)}
              f
            />
          </Modal>
        </>
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
    marginBottom: 25,
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
    marginTop: 20,
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
  statusBadgeAtual: {
    backgroundColor: "#80F04E",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusBadgeFinalizada: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    color: "black",
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
    fontSize: 15,
    marginLeft: 8,
  },
  moneyText: {
    color: "white",
    fontSize: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoAdicionar: {
    backgroundColor: "#0E6EFF",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  textoBotaoAdd: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
