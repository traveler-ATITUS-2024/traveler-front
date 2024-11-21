import logo from "../../../assets/logo.png";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../context/AuthContext";
import { buscarDespesas } from "../../services/gastosService";

export default function MeusGastos({ navigation }) {
  const route = useRoute();
  const { viagem } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [despesas, setDespesas] = useState([]);
  console.log(despesas);

  useFocusEffect(
    React.useCallback(() => {
      buscaMinhasDespesas();
    }, [])
  );

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
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <View style={styles.actionContainer}>
          {despesas.map((despesa, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <MaterialCommunityIcons name="food" size={25} color="#FFF" />
              <Text style={styles.buttonText}>{categoria.nome}</Text>
              <Text style={styles.valueText}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(despesa.valorReal)}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    paddingHorizontal: 25,
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
    marginTop: 20,
  },
  meusGastos: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    alignItems: "start",
  },
  infoContainer: {
    marginTop: 40,
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
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#071222",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
