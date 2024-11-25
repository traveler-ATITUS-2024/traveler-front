import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/authService";
import { useFocusEffect } from "@react-navigation/native";
import logo from "../../../assets/logo.png";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      };
    }, [])
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    try {
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas são diferentes.");
        return;
      }

      setIsLoading(true);

      const { erro, data, mensagem } = await register(username, email, password);

      if (erro) {
        Alert.alert(mensagem);
        return;
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar.");
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
              placeholder="Nome Completo"
              placeholderTextColor="white"
              value={username}
              onChangeText={setUsername}
              editable={!isLoading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />

            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Insira sua senha"
                placeholderTextColor="#FFF"
                onChangeText={setPassword}
                autoCapitalize="none"
                value={password}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.icon}
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

            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                placeholderTextColor="#FFF"
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
                secureTextEntry={!showConfirmPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={toggleConfirmPasswordVisibility}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <Ionicons name="eye" color="#FFF" size={25} />
                ) : (
                  <Ionicons name="eye-off" color="#FFF" size={25} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {isLoading ? (
            <View style={[styles.botaoCadastrar, styles.botaoEntrarLoading]}>
              <ActivityIndicator size="small" color="#FFF" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.botaoCadastrar}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.textobotao}>Cadastrar-se</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.acessoLogin, isLoading && styles.disabledButton]}
            onPress={() => navigation.navigate("Login")}
            disabled={isLoading}
          >
            <Text style={styles.login}>Já possuo uma conta</Text>
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
    marginBottom: 60,
  },
  logo: {
    width: 98,
    height: 83,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    letterSpacing: 6.2,
    fontFamily: "Inter",
    color: "#FFF",
  },
  form: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  inputArea: {
    position: "relative",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    fontSize: 18,
    color: "#FFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginBottom: 20,
    paddingVertical: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 8,
  },
  botaoCadastrar: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 20,
    marginTop: 20,
  },
  botaoEntrarLoading: {
    justifyContent: "center",
    height: 50,
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
    width: 150,
    marginTop: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
