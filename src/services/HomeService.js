import { Alert } from "react-native";
import api from "./api";

export const buscarViagens = async (userId, token) => {
  try {
    const response = await api.get(`/viagem/usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao buscar as viagens.");
    return null;
  }
};
