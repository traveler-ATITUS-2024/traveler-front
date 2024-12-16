import logo from "../../../assets/logo.png";

import React, { useState, version } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../context/AuthContext";
import {
  buscarDespesas,
  buscarDespesasDaCategoria,
} from "../../services/gastosService";

export default function MeusGastos({ navigation }) {
  const route = useRoute();
  const { viagem } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [despesas, setDespesas] = useState([]);
  const [despesaDaCategoria, setDespesaDaCategoria] = useState([]);

  const totalDespesas = despesaDaCategoria.reduce(
    (acc, categoria) => acc + categoria.totalDespesas,
    0
  );

  const icones = {
    1: "silverware-fork-knife",
    2: "bed",
    3: "car",
    4: "shopping",
    5: "ticket",
    6: "security",
    7: "hospital",
    8: "more",
  };

  const cores = {
    1: "#FFA500",
    2: "#ADD8E6",
    3: "#0000FF",
    4: "#008000",
    5: "#800080",
    6: "#808080",
    7: "#FF0000",
    8: "#FFD700",
  };

  useFocusEffect(
    React.useCallback(() => {
      buscarDespesaPorCategoria();
      buscaMinhasDespesas();
    }, [])
  );

  const buscarDespesaPorCategoria = async () => {
    try {
      setLoading(true);
      const response = await buscarDespesasDaCategoria(viagem.id, token);

      if (response) {
        setDespesaDaCategoria(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buscaMinhasDespesas = async () => {
    try {
      setLoading(true);
      const response = await buscarDespesas(viagem.id, token);

      if (response) {
        setDespesas(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.titulo}>
          {viagem.nome.length > 25
            ? `${viagem.nome.substring(0, 25)}...`
            : viagem.nome}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.meusGastos}>Meus Gastos:</Text>
          <View style={styles.valueContainer}>
            <Text
              style={
                totalDespesas <= viagem.valorPrv
                  ? styles.moneyText
                  : styles.moneyTextRed
              }
            >
              {" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalDespesas)}
            </Text>
            <Text style={styles.moneyTextGray}>
              /{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              }).format(viagem.valorPrv)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <View style={styles.containerCards}>
          <TouchableOpacity
            style={styles.botaoTodas}
            onPress={() =>
              navigation.navigate("TodasDespesas", {
                despesas,
                viagem,
                totalDespesas,
              })
            }
          >
            <Text style={styles.textobotaoTodas}>Ver todas</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.actionContainer}>
              {despesaDaCategoria.map((categoria, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("DespesaPorCategoria", {
                      categoria,
                      viagem,
                      totalDespesas,
                    })
                  }
                >
                  <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                      name={icones[categoria.categoriaId] || "folder"}
                      size={25}
                      color={cores[categoria.categoriaId] || "#FFF"}
                    />
                    <Text style={styles.buttonText}>
                      {categoria.nome.length > 18
                        ? `${categoria.nome.substring(0, 18)}...`
                        : categoria.nome}
                    </Text>
                  </View>
                  <Text style={styles.valueText}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(categoria.totalDespesas)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        style={viagem.statusId === 1 ? styles.botao : styles.botaoDisabled}
        onPress={() => navigation.navigate("CadastroDespesa", { viagem })}
        disabled={viagem.statusId === 2}
      >
        <Text style={styles.textobotao}>+ Adicionar Despesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    paddingHorizontal: 25,
  },
  containerCards: {
    flex: 1,
    backgroundColor: "#00050D",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    justifyContent: "space-between",
  },
  backButton: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 5,
    left: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
    textAlign: "center",
    flex: 1,
    marginTop: 10,
  },
  meusGastos: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    alignItems: "start",
  },
  infoContainer: {
    marginTop: 20,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  meusGastos: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moneyTextGray: {
    color: "gray",
    fontSize: 16,
    marginLeft: 4,
  },
  moneyText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  moneyTextRed: {
    color: "red",
    fontSize: 16,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#888",
    marginVertical: 20,
    width: "100%",
  },
  actionContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 125,
    marginTop: 50,
  },
  button: {
    width: "100%",
    backgroundColor: "#071222",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  botao: {
    backgroundColor: "#0E6EFF",
    width: 315,
    height: 51,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  botaoDisabled: {
    backgroundColor: "#0A4DB3",
    width: 315,
    height: 51,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    opacity: 0.6,
  },
  textobotao: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  botaoTodas: {
    backgroundColor: "#0E6EFF",
    width: 100,
    height: 31,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    right: 2,
  },
  textobotaoTodas: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
