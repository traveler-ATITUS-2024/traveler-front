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

export const buscarDespesasDaCategoria = async (viagemId, token) => {
  try {
    const response = await api.get(`/viagem/${viagemId}/totalDespesas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    return response?.data;
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao buscar as despesas.");
    return false;
  }
}

export const adicionarDespesa = async (
  viagemId,
  categoriaSelecionada,
  nomeGasto,
  dataGasto,
  valorDespesa,
  token
) => {
  try {
    const response = await api.post("/despesas", 
      {
        categoriaId: categoriaSelecionada,
        viagemId: viagemId,
        nome: nomeGasto,
        descricao: "",
        data: dataGasto,
        valor: valorDespesa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      Alert.alert("Sucesso!", "Despesa cadastrada com sucesso.");
    }
    
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
