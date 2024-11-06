import { useAuth } from "../context/AuthContext";

const excluirConta = async () => {
    const {token, user} = useAuth();

    try {
      const response = await fetch(`https://traveler-api-n420.onrender.com/usuario/${user}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert("Conta excluída com sucesso!");
        console.log("Comunicou")
      } else {
        Alert.alert("Erro ao excluir a conta", "Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir a conta.");
    }
  };

  export default excluirConta;