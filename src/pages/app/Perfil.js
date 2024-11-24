import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import excluirConta from "../../services/PerfilService";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../services/authService";
import logo from "../../../assets/logo.png";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native-web";

export default function Perfil({ navigation }) {
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const nomeUsuario = decoded.nome;
  const email = decoded.email;
  const { setUser, setToken } = useAuth();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const excluirMinhaConta = async () => {
    try {
      const response = await excluirConta(decoded.id, token);

      if (response) {
        Alert.alert("Até breve");
        await logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sairDaConta = async () => {
    try {
      setIsLoading(true)
      const response = await logout(); 

      if (response) {
        setUser(null);
        setToken(null);
  
        await AsyncStorage.clear();
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.avatar} />
        <Text style={styles.travelerText}>traveler</Text>
      </View>

      <View style={styles.infousuario}>
        <View style={styles.nomeContainer}>
          <Text style={styles.nomedousuario}>
            Olá, {"\n"}
            {nomeUsuario}
          </Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.botaocontainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("EditarNome")}
        >
          <Text style={styles.textobotao}>Editar Nome</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("EditarSenha")}
        >
          <Text style={styles.textobotao}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredButton}>
        <TouchableOpacity
          style={styles.botaoexcluir}
          onPress={excluirMinhaConta}
        >
          <Image
            source={require("../../../assets/lixeiraexcluir.png")}
            style={styles.icon}
          />
          <Text style={styles.textoBotaoExcluir}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredButton}>
        <TouchableOpacity style={styles.botaosair} onPress={sairDaConta}>
          <Image
            source={require("../../../assets/logout.png")}
            style={styles.icon}
          />
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Você tem certeza que deseja sair da conta?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={sairDaConta}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalButtonText} disabled={isLoading}>
                    Sim, Sair
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModal(false)}
              >
                <Text style={styles.modalButtonText} disabled={isLoading}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  travelerText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 6.2,
  },
  infousuario: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  nomeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nomedousuario: {
    color: "#FFF",
    fontSize: 21,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  lapis: {
    width: 18,
    height: 18,
    marginTop: 10,
    tintColor: "#0A54C2",
  },
  email: {
    color: "#BBB",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
  },
  botaocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  botao: {
    backgroundColor: "#061730",
    paddingVertical: 15,
    borderRadius: 33,
    width: 150,
    alignItems: "center",
  },
  textobotao: {
    color: "#FFF",
    fontSize: 16,
  },
  botaoexcluir: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 30,
    width: "90%",
    justifyContent: "center",
  },
  textoBotaoExcluir: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  botaosair: {
    flexDirection: "row",
    backgroundColor: "#0A54C2",
    paddingVertical: 12,
    borderRadius: 30,
    width: 139,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 220
  },
  textoBotaoSair: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  icon: {
    width: 20,
    height: 20,
  },
  centeredButton: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: "100%",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 30,
    backgroundColor: "#071222",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButtonConfirm: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
