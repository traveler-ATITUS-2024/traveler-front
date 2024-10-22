import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    await AsyncStorage.setItem(
      "@userCredentials",
      JSON.stringify({ email, password })
    );

    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return {
      erro: true,
      mensagem:
        error.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais.",
    };
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post("/auth/register", { email, password });

    await AsyncStorage.setItem(
      "@userCredentials",
      JSON.stringify({ email, password })
    );

    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return {
      erro: true,
      mensagem:
        error.response?.data?.message ||
        "Erro ao registrar usuário. Tente novamente.",
    };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("@userCredentials");
    return { erro: false, mensagem: "Logout realizado com sucesso." };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return {
      erro: true,
      mensagem: "Erro ao fazer logout. Tente novamente.",
    };
  }
};
