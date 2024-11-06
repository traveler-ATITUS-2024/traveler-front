import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import excluirConta from "../../services/PerfilService";


export default function Perfil() {
  const nomeUsuario = "Bernardo Sozo Fattini";
  const email = "bernardofattini@gmail.com";
  const { token } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.avatar}
        />
        <Text style={styles.travelerText}>traveler</Text>
      </View>
      
      <View style={styles.infousuario}>
        <View style={styles.nomeContainer}>
          <Text style={styles.nomedousuario}>Olá, {"\n"}{nomeUsuario}</Text>
          <TouchableOpacity style={styles.botaolapis}>
            <Image
              source={require("../../../assets/lapizinhonome.png")}
              style={styles.lapis}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.botaocontainer}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textobotao}>Editar Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textobotao}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredButton}>
        <TouchableOpacity style={styles.botaoexcluir}
          onPress={excluirConta}
        >
          <Image
            source={require("../../../assets/lixeiraexcluir.png")}
            style={styles.icon}
          />
          <Text style={styles.textoBotaoExcluir}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredButton}>
        <TouchableOpacity style={styles.botaosair}>
          <Image
            source={require("../../../assets/logout.png")}
            style={styles.icon}
          />
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
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
    marginLeft: 200,
    marginTop: 275,
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
});
