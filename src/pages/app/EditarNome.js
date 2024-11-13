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
import { alterarNome } from "../../services/PerfilService";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [nome, setNome] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);
  const { token } = useAuth();
  const decoded = jwtDecode(token);

  const alterarMeuNome = async () => {
    try {
      const response = await alterarNome(decoded.id, token, nome);

      //   if (response) {
      //     navigation.navigate("Perfil");
      //   }
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
          <>
            <View style={styles.header}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.titulo}>traveler</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Digite o seu novo nome"
                placeholderTextColor="white"
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <TouchableOpacity style={styles.botao} onPress={alterarMeuNome}>
              <Text style={styles.textobotao}>Alterar nome</Text>
            </TouchableOpacity>
          </>
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
