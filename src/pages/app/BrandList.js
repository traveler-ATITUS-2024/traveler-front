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
import { Ionicons } from "@expo/vector-icons";

export default function BrandList({ navigation }) {
  const [brandsData, setBrandsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addBrand}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const addBrand = () => {
    navigation.navigate("BrandForm");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleEdit = (brand) => {
    navigation.navigate("BrandForm", { brand });
  };

  const handleDelete = (brand) => {
    console.log("Excluir marca com ID:", brand);
  };

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
