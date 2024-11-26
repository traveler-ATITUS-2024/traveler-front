import { Alert } from "react-native";
import api from "./api";
import dayjs from "dayjs";

export const buscarDespesas = async (viagemId, token) => {
  try {
    const response = await api.get(`/despesas/viagem/${viagemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao buscar as despesas.");
    return false;
  }
};

export const buscarDespesasDaCategoria = async (viagemId, token) => {
  try {
    const response = await api.get(`/viagem/${viagemId}/totalDespesas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao buscar as despesas.");
    return false;
  }
};

export const deletarDespesa = async (despesaId, token) => {
  try {
    const response = await api.delete(`/despesas/${despesaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      Alert.alert("Sucesso!", "Despesa excluída com sucesso.");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const adicionarDespesa = async (
  viagemId,
  categoriaSelecionada,
  nomeGasto,
  dataGasto,
  horaGasto,
  valorDespesa,
  token
) => {
  try {
    const dataHoraConcatenada = dayjs(dataGasto)
      .set("hour", dayjs(horaGasto).hour())
      .set("minute", dayjs(horaGasto).minute())
      .set("second", dayjs(horaGasto).second())
      .utc()
      .subtract(3, "hours")
      .toISOString();
    console.log(dataHoraConcatenada);

    const response = await api.post(
      "/despesas",
      {
        categoriaId: categoriaSelecionada,
        viagemId: viagemId,
        nome: nomeGasto,
        descricao: "",
        data: dataHoraConcatenada,
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
};
