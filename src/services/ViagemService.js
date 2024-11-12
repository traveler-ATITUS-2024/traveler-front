import { useState, useEffect } from "react";
import dayjs from "dayjs";  
import api from "./api";

const useViagemService = (navigation) => {
  const [calendarioVisivel, setCalendarioVisivel] = useState({
    ida: false,
    volta: false,
  });
  const [tituloViagem, setTituloViagem] = useState("");
  const [dataIda, setDataIda] = useState(null);
  const [dataVolta, setDataVolta] = useState(null);
  const [cidade, setCidade] = useState("");
  const [gastoPrevisto, setGastoPrevisto] = useState("R$ 0,00");
  const [coordenadas, setCoordenadas] = useState({ latitude: null, longitude: null });

  // Função para salvar a viagem e enviar para api
  const validaEEnviaViagem = async () => {
    try {
      // Validação dos dados da viagem
      if (!tituloViagem) throw new Error("O título da viagem é obrigatório.");
      if (!dataIda) throw new Error("A data de ida é obrigatória.");
      if (!dataVolta) throw new Error("A data de volta é obrigatória.");
      if (new Date(dataIda) > new Date(dataVolta)) {
        throw new Error("A data de volta não pode ser anterior à data de ida.");
      }
      if (!gastoPrevisto || gastoPrevisto === "R$ 0,00") {
        throw new Error("O gasto previsto é obrigatório.");
      }

      // Formatando as datas usando dayjs
      const dataIdaFormatada = dayjs(dataIda).format("YYYY-MM-DD");
      const dataVoltaFormatada = dayjs(dataVolta).format("YYYY-MM-DD");

      // Criando o objeto viagem corretamente
      const viagem = {
        titulo: tituloViagem,
        dataIda: dataIdaFormatada,
        dataVolta: dataVoltaFormatada,
        cidade,
        gastoPrevisto,
        coordenadas, 
      };

      // Enviando os dados 
      const response = await api.post('/viagens', viagem);
      console.log("Dados enviados com sucesso:", response.data);

      return { success: true, message: "Viagem salva com sucesso!" };
    } catch (error) {
      console.error("Erro ao salvar a viagem:", error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  // Função para adicionar a viagem, chamada pela View
  const adicionarViagem = async () => {
    const resultado = await validaEEnviaViagem();

    if (resultado.success) {
      console.log(resultado.message);
      navigation.navigate("HomecomViagem");
    } else {
      alert(resultado.message);
    }
  };

  // Função para definir a cidade selecionada e armazenar as coordenadas
  const definirCidade = (cidadeSelecionada) => {
    if (!cidadeSelecionada) {
      console.log("Nenhuma cidade selecionada");
      return;
    }

    const descricaoCidade =
      cidadeSelecionada.description || cidadeSelecionada.formatted_address;
    const latitude = cidadeSelecionada.geometry?.location?.lat;
    const longitude = cidadeSelecionada.geometry?.location?.lng;

    setCidade(descricaoCidade);
    setCoordenadas({ latitude, longitude });

    console.log(`Cidade ${descricaoCidade} selecionada com sucesso`, { latitude, longitude });
  };

  // Função para formatar o valor como moeda
  const formataMoeda = (value) => {
    let numericValue = value.replace(/\D/g, "");
    if (numericValue.length === 0) {
      numericValue = "0";
    }
    numericValue = (numericValue / 100).toFixed(2).replace(".", ",");
    numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${numericValue}`;
  };

  return {
    tituloViagem,
    setTituloViagem,
    dataIda,
    setDataIda,
    dataVolta,
    setDataVolta,
    cidade,
    setCidade,
    coordenadas,
    setCoordenadas,
    calendarioVisivel,
    setCalendarioVisivel,
    validaEEnviaViagem,
    gastoPrevisto,
    setGastoPrevisto,
    definirCidade,
    formataMoeda,
    adicionarViagem,
  };
};

export default useViagemService;
