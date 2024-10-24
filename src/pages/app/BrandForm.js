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
import { useAuth } from "../../context/AuthContext";
import { createBrand, updateBrand } from "../../services/brandService";

export default function BrandForm({ route, navigation }) {
  const brandToUpdate = route.params?.brandToUpdate;
  const [description, setDescription] = useState(
    brandToUpdate ? brandToUpdate.description : ""
  );
  const { token } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: brandToUpdate ? "Editar Marca" : "Cadastrar Marca",
    });
  }, [navigation]);

  useEffect(() => {
    console.log(brandToUpdate);
  }, []);

  const handleSave = async () => {
    if (!description) {
      Alert.alert("Erro", "Por favor, preencha o campo de descrição.");
      return;
    }

    let response = {};
    if (brandToUpdate) {
      response = await updateBrand(brandToUpdate.id, { description }, token);
    } else {
      response = await createBrand({ description }, token);
    }

    if (response.erro) {
      Alert.alert("Algum erro ocorreu!");
      return;
    }

    navigation.goBack();
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

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {brandToUpdate ? "Salvar" : "Cadastrar"}
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
