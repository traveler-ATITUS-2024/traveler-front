import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { forgotPassword, login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail("");
        setPassword("");
      };
    }, [])
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const { erro, data, mensagem } = await login(email, password);

      if (erro) {
        Alert.alert(mensagem);
        return;
      }

      const { name, token } = data;

      setUser({ name });
      setToken(token);

      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.titulo}>traveler</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
              editable={!isLoading}
            />

            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Insira sua senha"
                placeholderTextColor="#FFF"
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.icone}
                onPress={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <Ionicons name="eye" color="#FFF" size={25} />
                ) : (
                  <Ionicons name="eye-off" color="#FFF" size={25} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              disabled={isLoading}
            >
              <Text style={styles.esqueciSenhaText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={[styles.botaoEntrar, styles.botaoEntrarLoading]}>
              <ActivityIndicator size="small" color="#FFF" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.textobotao}>Entrar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.acessoLogin, isLoading && styles.disabledButton]}
            onPress={() => navigation.navigate("SignUp")}
            disabled={isLoading}
          >
            <Text style={styles.texto}>Ainda não possui uma conta?</Text>
            <Text style={styles.login}>Cadastre-se agora!</Text>
            <View style={styles.linha}></View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    justifyContent: "center",
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 98,
    height: 83,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 24,
    letterSpacing: 6.2,
    fontFamily: "Inter",
    color: "#FFF",
  },
  form: {
    paddingHorizontal: 50,
  },
  input: {
    fontSize: 18,
    color: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginBottom: 30,
    padding: 10,
  },
  inputArea: {
    position: "relative",
    marginBottom: 8,
  },
  senhaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showPasswordText: {
    color: "#FFF",
    fontSize: 14,
  },
  lembrarMeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 130,
    left: 48,
    right: 50,
  },
  esqueciSenhaText: {
    color: "#FFF",
    marginTop: -10,
  },
  lembrarMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  lembrarMeText: {
    color: "#FFF",
    marginLeft: 5,
  },
  botaoEntrar: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 30,
    marginTop: 50,
  },
  textobotao: {
    color: "#FFF",
    fontSize: 18,
  },
  acessoLogin: {
    alignItems: "center",
  },
  login: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 5,
  },
  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginTop: 5,
    width: 150,
  },
  icone: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  texto: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 5,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: "#6c757d",
  },
  botaoEntrarLoading: {
    justifyContent: "center",
    height: 50, 
  },
});
