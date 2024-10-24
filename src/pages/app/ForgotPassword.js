import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { forgotPassword, login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  const forgotMyPassword = async () => {
    try {
      const { erro, data, mensagem } = await forgotPassword(email);

      if (erro) {
        Alert.alert(mensagem);
        return;
      }

      setEmailEnviado(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {emailEnviado ? (
            <View style={styles.successMessage}>
              <Text style={styles.texto}>E-mail enviado com sucesso!</Text>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.textobotao}>Voltar para o login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.titulo}>traveler</Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o e-mail cadastrado"
                  placeholderTextColor="white"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <TouchableOpacity style={styles.botao} onPress={forgotMyPassword}>
                <Text style={styles.textobotao}>Solicitar recuperação</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acessoLogin}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.login}>Voltar para o login</Text>
              </TouchableOpacity>
            </>
          )}
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
  acessoLogin: {
    alignItems: "center",
  },
  texto: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 5,
  },
  login: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 5,
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
  botao: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 30,
    marginTop: 15,
    borderRadius: 40,
  },
  textobotao: {
    color: "#FFF",
    fontSize: 18,
  },
  esqueciSenhaText: {
    color: "#FFF",
  },
});
