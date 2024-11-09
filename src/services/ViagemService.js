import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViagemService = (fechar) => {
  const [calendarioVisivel, setCalendarioVisivel] = useState({
    ida: false,
    volta: false,
  });
  const [tituloViagem, setTituloViagem] = useState("");
  const [dataIda, setDataIda] = useState(null);
  const [dataVolta, setDataVolta] = useState(null);
  const [cidade, setCidade] = useState("");
  const [gastoPrevisto, setGastoPrevisto] = useState("R$ 0,00");

  // Salva a cidade no AsyncStorage
  const salvarCidade = async (cidadeSelecionada) => {
    if (!cidadeSelecionada) {
      console.log("Nenhuma cidade selecionada");
      return;
    }

    try {
      const { lat, lng } = cidadeSelecionada.geometry.location;
      // Salva a descrição completa da cidade (nome e país)
      const descricaoCidade =
        cidadeSelecionada.description || cidadeSelecionada.formatted_address;

      await AsyncStorage.setItem(
        "@nomeCidade",
        JSON.stringify({ descricao: descricaoCidade })
      );
      setCidade(descricaoCidade);
      await AsyncStorage.setItem(
        "@coordenadasCidade",
        JSON.stringify({ lat, lng })
      );

      console.log(`Cidade ${descricaoCidade} salva com sucesso`);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);

      fechar?.();
    } catch (error) {
      console.log("Erro ao salvar a cidade e coordenadas", error);
    }
  };

  // Puxa a cidade do Async
  const puxarCidade = async () => {
    try {
      const cidadeArmazenada = await AsyncStorage.getItem("@nomeCidade");
      if (cidadeArmazenada) {
        const cidadeObj = JSON.parse(cidadeArmazenada);
        const descricaoCidade = cidadeObj.descricao || "Cidade desconhecida";
        setCidade(descricaoCidade);
      } else {
        console.log("Nenhuma cidade armazenada encontrada");
      }
    } catch (error) {
      console.log("Erro ao obter a cidade:", error);
    }
  };

  // Função para obter cidade armazenada no AsyncStorage (chamada no useEffect)
  const obterCidade = async () => {
    try {
      const cidadeArmazenada = await AsyncStorage.getItem("@nomeCidade");
      if (cidadeArmazenada) {
        setCidade(cidadeArmazenada);
      }
    } catch (error) {
      console.log("Erro ao obter a cidade:", error);
    }
  };

  // Função para exibir a data no formato correto
const formatarData = (date, tipo) => {
  if (!date) {
    return tipo === "ida" ? "Data de ida" : "Data de volta";
  }
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString("pt-BR");
};


  // Carrega a cidade automaticamente ao inicializar a service
  useEffect(() => {
    puxarCidade();
  }, []);

  // Exibe ou esconde o calendário
  const acaoCalendario = (tipo) => {
    setCalendarioVisivel((prev) => ({
      ida: tipo === "ida" ? !prev.ida : false,
      volta: tipo === "volta" ? !prev.volta : false,
    }));
  };

  // Função para salvar a data de ida no async
  const salvaDataIda = async (dataIdaSelecionada) => {
    setDataIda(dataIdaSelecionada);
    try {
      await AsyncStorage.setItem("@dataIda", dataIdaSelecionada.toISOString());
      console.log("Data de ida salva com sucesso:", dataIdaSelecionada);
    } catch (error) {
      console.log("Erro ao salvar a data de ida:", error);
    }
  };

  // Função para salvar a data de volta no async
  const salvaDataVolta = async (dataVoltaSelecionada) => {
    setDataVolta(dataVoltaSelecionada);
    try {
      await AsyncStorage.setItem(
        "@dataVolta",
        dataVoltaSelecionada.toISOString()
      );
      console.log("Data de volta salva com sucesso:", dataVoltaSelecionada);
    } catch (error) {
      console.log("Erro ao salvar a data de volta:", error);
    }
  };

  //Oculta o teclado e calendarios ao clicar fora do campo
  const ocultarTecladoECalendario = () => {
    Keyboard.dismiss();
    if (calendarioVisivel.ida || calendarioVisivel.volta) {
      setCalendarioVisivel({ ida: false, volta: false });
    }
  };

  // Formatação da cidade para exibição
  const cidadeFormatada = cidade
    ? `${cidade.description || cidade.formatted_address}, ${
        cidade.structured_formatting?.secondary_text || ""
      }`
    : "Nenhuma cidade selecionada";

  // Função que formata o valor inserido pelo usuário
  const formataValorInserido = (value) => {
    setGastoPrevisto(formataMoeda(value));
  };

  // Função para adicionar viagem e salvar os dados
  const addViagemDadosSalvos = async () => {
    try {
      const resultado = await cadastroViagemUseCase.salvarViagem({
        titulo,
        dataIda,
        dataVolta,
        gastoPrevisto,
        cidade,
      });

      if (resultado.success) {
        navigation.navigate("HomecomViagem"); // Navega para a tela "homecomviagem" após o sucesso
      } else {
        alert(resultado.message); // Mostra a mensagem de erro caso algo dê errado
      }
    } catch (error) {
      console.log("Erro ao adicionar viagem:", error);
    }
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
    dataVolta,
    cidade,
    setCidade,
    calendarioVisivel,
    acaoCalendario,
    formatarData,
    salvaDataIda,
    salvaDataVolta,
    ocultarTecladoECalendario,
    salvarCidade,
    obterCidade,
    puxarCidade,
    cidadeFormatada,
    formataValorInserido,
    gastoPrevisto,
    addViagemDadosSalvos,
  };
};

export default ViagemService;
