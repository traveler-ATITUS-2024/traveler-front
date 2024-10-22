import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductForm({ route, navigation }) {
  const { product } = route.params;
  const [description, setDescription] = useState(
    product ? product?.description : ""
  );
  const [brandId, setBrandId] = useState(product ? product?.brand?.id : "");
  const [brand, setBrand] = useState(
    product ? product?.brand?.description : ""
  );
  const [price, setPrice] = useState(product ? product?.price.toString() : "");
  const [brandSelected, setBrandSelected] = useState(
    product ? product?.brand : ""
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.product
        ? "Editar produto"
        : "Cadastrar produto",
    });
  }, [navigation]);

  const handleSave = async () => {
    if (!description || !brand || !price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.brandContainer}>
          <TextInput
            style={styles.brandInput}
            placeholder="Marca"
            value={brand}
            onChangeText={setBrand}
            editable={false}
          />
          <View style={{ width: "2%" }} />
          <TouchableOpacity
            style={styles.brandButton}
            onPress={() =>
              navigation.navigate("ProductBrandList", {
                selectBrand: (selectedBrand) => {
                  setBrandId(selectedBrand.id);
                  setBrand(selectedBrand.description);
                  setBrandSelected(selectedBrand);
                },
              })
            }
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {route.params?.product ? "Salvar Alterações" : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  brandInput: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    color: "#000",
  },
  brandButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "18%",
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
