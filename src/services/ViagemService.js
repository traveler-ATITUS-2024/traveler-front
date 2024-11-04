import AsyncStorage from "@react-native-async-storage/async-storage";

const usePlacesAutocompleteController = (fechar) => {
  
  const salvarCidade = async (cidadeSelecionada) => {
    if (!cidadeSelecionada) {
      console.log("Nenhuma cidade selecionada");
      return;
    }
    
    try {
      //Pegando latitude e longitude e nome da cidade
      const { lat, lng } = cidadeSelecionada.geometry.location;
      const nomeCidade = cidadeSelecionada.description || cidadeSelecionada.formatted_address;
      //description faz pegar nome da cidade e país e formatted_address pega outros detralhes do endereço (hotel, rua, etc..)

      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      
      //Salva cidade e coordenadas no async
      await AsyncStorage.setItem("@nomeCidade", nomeCidade);
      await AsyncStorage.setItem("@coordenadasCidade", JSON.stringify({ lat, lng }));
      
      console.log(`Cidade ${nomeCidade} salva com sucesso`);
      
      //Fecha modal
      fechar?.();
    } catch (error) {
      console.log("Erro ao salvar a cidade e coordenadas", error);
    }
  };

  return { salvarCidade };
};

export default usePlacesAutocompleteController;
