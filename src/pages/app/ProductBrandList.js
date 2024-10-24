import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBrands } from "../../services/brandService";

export default function ProductBrandList({ navigation, route }) {
  const { selectBrand } = route.params;
  const [brandsData, setBrandsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Selecionar Marca",
    });
  }, [navigation]);

  useEffect(() => {
    handleBrands();
  }, []);

  async function handleBrands() {
    const response = await getBrands(token);

    if (response.erro) {
      Alert.info("Algum erro ocorreu");
      return;
    }

    setBrandsData(response.data);
  }

  const handleSelectBrand = (brand) => {
    selectBrand(brand);
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectBrand(item)}
    >
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {brandsData ? (
        <FlatList
          data={brandsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
