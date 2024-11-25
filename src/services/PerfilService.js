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

export const alterarNome = async (userId, token, nome) => {
  try {
    const response = await api.put(
      `usuario/${userId}`,
      { nome: nome },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      Alert.alert("Sucesso!", "Seu nome foi alterado com sucesso.");
      return true;
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao alterar o nome.");
  }
};

export const alterarSenha = async (userId, token, senhaAtual, senhaNova) => {
  try {
    const response = await api.put(
      `usuario/${userId}`,
      { senhaAtual: senhaAtual, senha: senhaNova },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      Alert.alert("Sucesso", "Senha alterada com sucesso. Faça login novamente.");
      return true;
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao alterar a senha.");
  }
};

export default { excluirConta, alterarNome, alterarSenha };
