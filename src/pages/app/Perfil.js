import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";


export default function Perfil() {
  const nomeUsuario = "Bernardo Sozo Fattini";
  const email = "bernardo@gmail.com";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infousuario}>
        <View style={styles.nomeContainer}>
          <Text style={styles.nomedousuario}>
            Olá, {"\n"} {nomeUsuario}
          </Text>
          <TouchableOpacity style={ styles.botaolapis}>
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

      <View>
        <TouchableOpacity>
          <Image src='../../assets/excluir.png'/>
          <Text>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity>
          <Image src='../../assets/sair.png'/>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>

      

      <View style={styles.linha}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 70,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infousuario: {
    marginRight: 100,
  },
  nomeContainer:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  nomedousuario: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  lapis: {
    width: 16, 
    height: 16, 
    marginLeft: 25, 
  },
  email: {
    color: "#BBB",
    fontSize: 14,
    marginTop: 10,
  },
  botaocontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 30,
  },
  botao: {
    backgroundColor: "#0D1B24",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textobotao: {
    color: "#FFF",
    fontSize: 16,
  },
  containerviagem: {
    color: "#FFF",
    fontSize: 20,
    marginBottom: 10,
  },
  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    width: 150,
    marginTop: 5,
    width: "100%",
  },
});
