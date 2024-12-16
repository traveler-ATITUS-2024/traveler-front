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
  Share,
  TouchableWithoutFeedback,
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
  const { totalDespesas } = route.params;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [modalExcluirDespesa, setModalExcluirDespesa] = useState(false);
  const [modalVisualizarDespesa, setModalVisualizarDespesa] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
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
    if (!despesaSelecionada) return;

    try {
      setIsLoading(true);
      const response = await deletarDespesa(despesaSelecionada, token);

      if (response) {
        setModalExcluirDespesa(false);
        setDespesaSelecionada(null);
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

  const categorias = {
    1: "Alimentação",
    2: "Hospedagem",
    3: "Transporte",
    4: "Compras",
    5: "Ingressos",
    6: "Seguro e Documentação",
    7: "Saúde e bem-estar",
    8: "Outros",
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

  const toggleDespesaExpandida = (id) => {
    setListaDespesas((prevDespesas) =>
      prevDespesas.map((despesa) =>
        despesa.id === id
          ? { ...despesa, expanded: !despesa.expanded }
          : { ...despesa, expanded: false }
      )
    );
  };

  const calculaPorcentagem = (valorParte, valorTodo) => {
    return ((valorParte / valorTodo) * 100) / 100;
  };

  const compartilharDespesa = async (despesa) => {
    try {
      const message = `Despesa: ${despesa.nome}\nCategoria: ${
        categorias[despesa.categoriaId]
      }\nValor: ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }).format(despesa.valor)}\nData: ${dayjs(despesa.data)
        .add(3, "hours")
        .format("DD/MM/YYYY - HH:mm")}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      console.error("Erro ao compartilhar a despesa:", error);
      alert("Erro ao compartilhar a despesa.");
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
            <TouchableOpacity
              key={despesa.id}
              style={[
                despesa.expanded
                  ? styles.despesacardExpanded
                  : styles.despesacard,
                despesa.expanded && { height: despesa.expanded ? 200 : 120 },
              ]}
              onPress={() => toggleDespesaExpandida(despesa.id)}
              onLongPress={() => {
                setModalVisualizarDespesa(true);
                setDespesaSelecionada(despesa);
              }}
            >
              <MaterialCommunityIcons
                name={icones[despesa.categoriaId] || "folder"}
                size={32}
                color={cores[despesa.categoriaId] || "#FFF"}
              />
              <View style={styles.infoContainer}>
                <Text
                  style={
                    !despesa.expanded
                      ? styles.nomedespesa
                      : styles.nomedespesaExpanded
                  }
                >
                  {despesa.nome.length > 20 && !despesa.expanded
                    ? `${despesa.nome.substring(0, 20)}...`
                    : despesa.nome}
                </Text>
                <Text
                  style={
                    !despesa.expanded
                      ? styles.datadespesa
                      : styles.datadespesaExpanded
                  }
                >
                  {despesa.data
                    ? dayjs(despesa.data)
                        .add(3, "hours")
                        .format("DD/MM - HH:mm")
                    : ""}
                </Text>
              </View>
              <View></View>
              <View style={styles.valordespesacontainer}>
                <Text
                  style={
                    !despesa.expanded
                      ? styles.valordespesa
                      : styles.valordespesaExpanded
                  }
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 2,
                  }).format(despesa.valor)}
                </Text>
              </View>

              {despesa.expanded && (
                <View style={styles.expandedInfoContainer}>
                  <Text style={styles.detalhes}>
                    Representa{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "percent",
                      maximumFractionDigits: 1,
                    }).format(
                      calculaPorcentagem(despesa.valor, totalDespesas)
                    )}{" "}
                    do total gasto.
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExcluirDespesa}
        onRequestClose={() => {
          setModalExcluirDespesa(false);
          setDespesaSelecionada(null);
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
                  setModalVisualizarDespesa(true);
                }}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisualizarDespesa}
        onRequestClose={() => {
          setModalVisualizarDespesa(false);
          setDespesaSelecionada(null);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisualizarDespesa(false);
            setDespesaSelecionada(null);
          }}
        >
          <View style={styles.modalOverlayDetails}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContentDetails}>
                <Text style={styles.modalTitleDetails}>Ações da despesa</Text>
                <View style={styles.modalButtonsDetails}>
                  <TouchableOpacity
                    style={[
                      styles.modalButtonConfirmDetails,
                      { backgroundColor: "#F44336" },
                    ]}
                    onPress={() => {
                      setModalExcluirDespesa(true);
                      setModalVisualizarDespesa(false);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.modalButtonTextDetails}>Excluir</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalButtonShareDetails,
                      isLoading && styles.disabledButton,
                    ]}
                    onPress={() => {
                      compartilharDespesa(despesaSelecionada);
                    }}
                    disabled={isLoading}
                  >
                    <Text style={styles.modalButtonTextDetails}>
                      Compartilhar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    left: 12,
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
  despesacardExpanded: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    borderBottomWidth: 3,
  },
  expandedInfoContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  nomedespesa: {
    color: "#ffffff",
    fontSize: 16,
  },
  nomedespesaExpanded: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  datadespesa: {
    color: "#696969",
    fontSize: 14,
    marginTop: 3,
  },
  datadespesaExpanded: {
    color: "#696969",
    fontSize: 16,
    marginTop: 3,
    textAlign: "center",
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
  valordespesaExpanded: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  detalhes: {
    color: "#fff",
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
  modalOverlayDetails: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentDetails: {
    height: "30%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleDetails: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  modalButtonsDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButtonConfirmDetails: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    bottom: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonShareDetails: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    bottom: 80,
    borderRadius: 8,
    backgroundColor: "#686868",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonTextDetails: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
