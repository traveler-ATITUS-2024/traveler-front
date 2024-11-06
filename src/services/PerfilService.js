import { useAuth } from "../context/AuthContext";
import api from "./api";

const excluirConta = async () => {
    const { token, user } = useAuth();
    console.log(token);
    console.log(user);
    try {
      const response = await api.delete(`/usuario/${user}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Consultou");
  
      if (response.status === 200) {
        Alert.alert("Conta excluída com sucesso!");
        console.log("bombou")
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir a conta.");
    }
  };

  export default excluirConta;