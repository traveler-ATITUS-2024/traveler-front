import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import flechaesquerda from "../../../assets/flechaesquerda.png";
import { KEY } from "@env";

export default function PlacesAutocomplete({ fechar, navigation }) {
  const handleSelectCity = (details) => {
    if (details) {
      navigation.navigate("CadastroViagem", {
        cidadeSelecionada: details,
      });
      fechar();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoinvisivel}
        onPress={fechar}
      ></TouchableOpacity>

      <View style={styles.conteudopesquisa}>
        <Animated.View style={styles.linha} />

        <View style={styles.containerPesquisa}>
          <TouchableOpacity onPress={fechar} style={styles.fundobotao}>
            <Image
              source={flechaesquerda}
              style={[styles.fundoicone, { tintColor: "#ffffff" }]}
            />
          </TouchableOpacity>

          <GooglePlacesAutocomplete
            placeholder="Qual o seu destino?"
            enablePoweredByContainer={false}
            filterReverseGeocodingByTypes={[
              "location",
              "administrative_area_level_3",
            ]}
            fetchDetails={true}
            onPress={(data, details) => handleSelectCity(details)}
            query={{
              key: KEY,
              language: "pt-BR",
            }}
            styles={{
              textInput: styles.textopesquisa,
              listView: {
                backgroundColor: "#00050D",
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 5,
                marginLeft: -30,
                height: "100%",
              },
              row: {
                backgroundColor: "#00050D",
                paddingVertical: 12,
                paddingHorizontal: 15,
                borderBottomColor: "#00050D",
                borderBottomWidth: 1,
                borderRadius: 8,
                marginTop: 5,
              },
              description: {
                color: "#fff",
                fontSize: 16,
              },
              separator: {
                height: 0.5,
                backgroundColor: "#00050D",
              },
            }}
            textInputProps={{
              placeholderTextColor: "rgba(255,255,255,0.65)",
              style: styles.textopesquisa,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00050D",
    flex: 1,
  },
  containerPesquisa: {
    backgroundColor: "#00050D",
    marginTop: 28,
    marginHorizontal: 15,
    flexDirection: "row",
    borderRadius: 40,
    paddingLeft: 15,
  },
  botaoinvisivel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  conteudopesquisa: {
    width: "100%",
    height: "85%",
    backgroundColor: "#071222",
    marginTop: 100,
    alignItems: "center",
    borderRadius: 40,
    zIndex: 2,
  },
  linha: {
    width: "15%",
    height: 3,
    backgroundColor: "rgba(255,255,255,0.50)",
    marginTop: 7,
  },
  textopesquisa: {
    width: 320,
    backgroundColor: "#00050D",
    height: 51,
    borderRadius: 40,
    paddingLeft: 5,
    color: "rgba(255,255,255,0.65)",
  },
  suggestionList: {
    backgroundColor: "#071222",
    borderRadius: 20,
    width: 320,
    alignSelf: "center",
  },
  fundobotao: {
    marginTop: 14,
  },
  fundoicone: {
    width: 25,
    height: 25,
  },
});
