import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import api from "./api";

export const excluirConta = async (userId, token) => {
  try {
    const response = await api.delete(`/usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      Alert.alert("Sucesso!", "Sua conta foi excluída com sucesso.");
    }

    return true;
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao tentar excluir a conta.");
  }
};

export default excluirConta;
