import { Alert } from "react-native";
import api from "./api";

export const buscarDespesas = async (viagemId, token) => {
  try {
    const response = await api.get(`/despesas/viagem/${viagemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao buscar as viagens.");
    return false;
  }
};
