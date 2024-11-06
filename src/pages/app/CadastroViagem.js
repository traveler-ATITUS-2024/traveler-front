import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
} from "react-native";
import ViagemService from "../../services/ViagemService"; 
import flechaesquerda from "../../../assets/flechaesquerda.png";
import logo from "../../../assets/logo.png";
import calendarioida from "../../../assets/calendarioida.png";

export default function CadastroViagem({ navigation }) {
  const { acaoCalendario } = ViagemService(); 

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.flechaContainer}>
            <Image
              source={flechaesquerda}
              style={[styles.flecha, { tintColor: "#FFFF" }]}
            />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.tituloContainer}>
          <TextInput
            style={styles.tituloInput}
            placeholder="Titulo da viagem:"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.datas}>
          <TouchableOpacity
            onPress={() => acaoCalendario("ida")}
            style={styles.dataContainer}
          >
            <Image source={calendarioida} style={styles.iconecalendario} />
            <Text style={styles.textoDatas}>
            
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00050D',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 80,
    paddingHorizontal: 16,
  },
  flechaContainer: {
    position: "absolute",
    left: 16,
  },
  logo: {
    width: 98,
    height: 83,
  },
  flecha: {
    width: 30,
    height: 30,
  },
  tituloContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  tituloInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    color: "#888",
    fontSize: 16,
    paddingVertical: 4,
  },
  datas: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconecalendario: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textoDatas: {
    color: "#fff",
    fontSize: 16,
  },
});
