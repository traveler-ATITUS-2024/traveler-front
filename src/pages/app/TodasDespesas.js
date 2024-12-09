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
import lixeira from "../../../assets/lixeiraexcluir.png";
import dayjs from "dayjs";
import { useAuth } from "../../context/AuthContext";
import { deletarDespesa } from "../../services/gastosService";
import { buscarDespesas } from "../../services/gastosService";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MeusGastos({ navigation }) {
  const route = useRoute();
  const { despesas } = route.params;
  const { viagem } = route.params;

  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [modalExcluirDespesa, setModalExcluirDespesa] = useState(false);
  const [despesaSelecionadaId, setDespesaSelecionadaId] = useState(null);
  const [listaDespesas, setListaDespesas] = useState([]);

  const buscaMinhasDespesas = async () => {
    try {
      setIsLoading(true);
      const response = await buscarDespesas(viagem.id, token);

      if (response) {
        setListaDespesas(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletarMinhaDespesa = async () => {
    if (!despesaSelecionadaId) return;

    try {
      setIsLoading(true);
      const response = await deletarDespesa(despesaSelecionadaId, token);

      if (response) {
        setModalExcluirDespesa(false);
        setDespesaSelecionadaId(null);
        buscaMinhasDespesas();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      buscaMinhasDespesas();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Todos os Gastos</Text>
      </View>

      <View style={styles.divider} />

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.despesacontainer}>
          {listaDespesas.map((despesa) => (
            <View key={despesa.id} style={styles.despesacard}>
              <MaterialCommunityIcons
                name={icones[despesa.categoriaId] || "folder"}
                size={32}
                color={cores[despesa.categoriaId] || "#FFF"}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.nomedespesa}>
                  {despesa.nome.length > 20
                    ? `${despesa.nome.substring(0, 20)}...`
                    : despesa.nome}
                </Text>
                <Text style={styles.datadespesa}>
                  {despesa.data
                    ? dayjs(despesa.data)
                        .add(3, "hours")
                        .format("DD/MM - HH:mm")
                    : ""}
                </Text>
              </View>
              <View style={styles.valordespesacontainer}>
                <Text style={styles.valordespesa}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 2,
                  }).format(despesa.valor)}
                </Text>
                {/* <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setDespesaSelecionadaId(despesa.id);
                    setModalExcluirDespesa(true);
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Image source={lixeira} style={{ tintColor: "#FF3B30" }} />
                  )}
                </TouchableOpacity> */}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExcluirDespesa}
        onRequestClose={() => {
          setModalExcluirDespesa(false);
          setDespesaSelecionadaId(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Você tem certeza que deseja excluir esta despesa?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButtonConfirm,
                  { backgroundColor: "#F44336" },
                ]}
                onPress={deletarMinhaDespesa}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalButtonText}>Sim, Excluir</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButtonCancel,
                  isLoading && styles.disabledButton,
                ]}
                onPress={() => {
                  setModalExcluirDespesa(false);
                  setDespesaSelecionadaId(null);
                }}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  despesacontainer: {
    marginTop: 20,
    height: "100%",
    alignItems: "center",
  },
  despesacard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    borderBottomWidth: 3,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  nomedespesa: {
    color: "#ffffff",
    fontSize: 16,
  },
  datadespesa: {
    color: "#696969",
    fontSize: 14,
    marginTop: 3,
  },
  valordespesacontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  valordespesa: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 30,
    backgroundColor: "#071222",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButtonConfirm: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 140,
  },
  modalButtonCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 140,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
