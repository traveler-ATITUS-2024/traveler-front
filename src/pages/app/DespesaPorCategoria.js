import React, { useState, useEffect } from "react";
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
import { useAuth } from "../../context/AuthContext";
import { buscarDespesas } from "../../services/gastosService";
import lixeira from "../../../assets/lixeiraexcluir.png";
import dayjs from "dayjs";
import { deletarDespesa } from "../../services/gastosService";

export default function DespesaPorCategoria({ navigation }) {
  const route = useRoute();
  const { categoria } = route.params;
  const { viagem } = route.params;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [despesasDaCategoria, setDespesaDaCategoria] = useState([]);
  const despesaFiltrada = despesasDaCategoria.filter(
    (despesasDaCategoria) =>
      despesasDaCategoria.categoriaId === categoria.categoriaId
  );

  useFocusEffect(
    React.useCallback(() => {
      buscaMinhasDespesas();
    }, [])
  );

  const buscaMinhasDespesas = async () => {
    try {
      setIsLoading(true);
      const response = await buscarDespesas(viagem.id, token);

      if (response) {
        setDespesaDaCategoria(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletarMinhaDespesa = async (id) => {
    try {
      setIsLoading(true);
      const response = await deletarDespesa(id, token);

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.titulo}>{categoria.nome}</Text>
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.despesacontainer}>
          {despesaFiltrada.map((despesa) => (
            <View key={despesa.id} style={styles.despesacard}>
              <View style={styles.suo}>
                <Text style={styles.nomedespesa}>{despesa.nome}</Text>
                <Text style={styles.datadespesa}>
                  {despesa.data
                    ? `${dayjs(despesa.data)
                        .add(3, "hours")
                        .format("DD - MMM - ")}${dayjs(despesa.data)
                        .add(3, "hours")
                        .format("HH:mm")}`
                    : ""}
                </Text>
              </View>
              <View style={styles.valordespesacontainer}>
                <Text style={styles.valordespesa}>R$ {despesa.valor}</Text>
                <View style={styles.separador}></View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletarMinhaDespesa(despesa.id)}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Image source={lixeira} style={{ tintColor: "#FF3B30" }} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
  despesacontainer: {
    marginTop: 20,
    marginEnd: 1,
    marginStart: 1,
    backgroundColor: "#020913",
    borderRadius: 32,
    height: "100%",
    alignItems: "center",
  },
  despesacard: {
    backgroundColor: "#061730",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "90%",
  },
  nomedespesa: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  datadespesa: {
    color: "#a9a9a9",
    fontSize: 14,
  },
  valordespesacontainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    alignItems: "center",
    marginEnd: 10,
  },
  valordespesa: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  separador: {
    width: 2,
    backgroundColor: "#888",
    height: 30,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
