import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "./api";

export const adicionarViagem = async (
  tituloViagem,
  dataIda,
  dataVolta,
  cidade,
  gastoPrevisto,
  coordenadas,
  token
) => {
  try {
    console.log(tituloViagem);
    console.log(dataIda);
    console.log(dataVolta);
    console.log(cidade);
    console.log(gastoPrevisto);
    console.log(coordenadas);
    console.log(token);

    const response = await api.post("/viagem", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      Alert.alert("Sucesso!", "Viagem criada com sucesso.");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export default { adicionarViagem };

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

//     // Formatando as datas usando dayjs
//     const dataIdaFormatada = dayjs(dataIda).format("YYYY-MM-DD");
//     const dataVoltaFormatada = dayjs(dataVolta).format("YYYY-MM-DD");

//     // Criando o objeto viagem corretamente
//     const viagem = {
//       titulo: tituloViagem,
//       dataIda: dataIdaFormatada,
//       dataVolta: dataVoltaFormatada,
//       cidade,
//       gastoPrevisto,
//       coordenadas,
//     };

//     // Enviando os dados
//     const response = await api.post("/viagens", viagem);
//     console.log("Dados enviados com sucesso:", response.data);

//     return { success: true, message: "Viagem salva com sucesso!" };
//   } catch (error) {
//     console.error("Erro ao salvar a viagem:", error);
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message,
//     };
//   }
// };

// Função para formatar o valor como moeda

//   return {
//     tituloViagem,
//     setTituloViagem,
//     dataIda,
//     setDataIda,
//     dataVolta,
//     setDataVolta,
//     cidade,
//     setCidade,
//     coordenadas,
//     setCoordenadas,
//     calendarioVisivel,
//     setCalendarioVisivel,
//     validaEEnviaViagem,
//     gastoPrevisto,
//     setGastoPrevisto,
//     definirCidade,
//     formataMoeda,
//     adicionarViagem,
//   };
// };

// export default useViagemService;
