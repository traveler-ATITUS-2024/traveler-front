import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "./api";
import { Alert } from "react-native";

export const adicionarViagem = async (
  tituloViagem,
  dataIda,
  dataVolta,
  gastoPrevisto,
  gastoReal,
  latitude,
  longitude,
  token
) => {
  try {
    const response = await api.post(
      "/viagem",
      {
        statusId: 1,
        nome: tituloViagem,
        dataIda: dataIda,
        dataVolta: dataVolta,
        valorPrv: gastoPrevisto,
        valorReal: gastoReal,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      Alert.alert("Sucesso!", "Viagem criada com sucesso.");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const excluirViagem = async (viagemId, token) => {
  try {
    const response = await api.delete(`/viagem/${viagemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      Alert.alert("Sucesso!", "Sua viagem foi excluída com sucesso.");
    }

    return true;
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao tentar excluir a viagem.");
  }
};

export const finalizarViagem = async (
  viagemId,
  nome,
  dataIda,
  dataVolta,
  valorPrv,
  valorReal,
  latitude,
  longitude,
  token
) => {
  try {
    const response = await api.put(
      `/viagem/${viagemId}`,
      {
        statusId: 2,
        nome: nome,
        dataIda: dataIda,
        dataVolta: dataVolta,
        valorPrv: valorPrv,
        valorReal: valorReal,
        latitude: latitude,
        longitude: longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      Alert.alert("Sucesso!", "Sua viagem foi finalizada");
    }

    return true;
  } catch (error) {
    console.error(error);
    Alert.alert("Erro ao finalizar a viagem");
  }
};
export default { adicionarViagem, excluirViagem, finalizarViagem };

// const useViagemService = (navigation) => {
// Função para salvar a viagem e enviar para api
// const validaEEnviaViagem = async () => {
//   try {
//     // Validação dos dados da viagem
//     if (!tituloViagem) throw new Error("O título da viagem é obrigatório.");
//     if (!dataIda) throw new Error("A data de ida é obrigatória.");
//     if (!dataVolta) throw new Error("A data de volta é obrigatória.");
//     if (new Date(dataIda) > new Date(dataVolta)) {
//       throw new Error("A data de volta não pode ser anterior à data de ida.");
//     }
//     if (!gastoPrevisto || gastoPrevisto === "R$ 0,00") {
//       throw new Error("O gasto previsto é obrigatório.");
//     }
