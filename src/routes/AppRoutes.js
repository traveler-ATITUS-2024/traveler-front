import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/authService";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/app/ForgotPassword";
import Home from "../pages/app/Home";
import ProductList from "../pages/app/ProductList";
import ProductForm from "../pages/app/ProductForm";
import ProductBrandList from "../pages/app/ProductBrandList";
import BrandList from "../pages/app/BrandList";
import BrandForm from "../pages/app/BrandForm";
import PlacesAutocomplete from "../pages/app/PlacesAutocomplete";

const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <AppStack.Screen
        name="PlacesAutocomplete"
        component={PlacesAutocomplete}
        options={{ headerShown: false }}
      /> */}
      {/* <AppStack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerTitle: "Produtos", headerTitleAlign: "center" }}
      />
      <AppStack.Screen
        name="ProductForm"
        component={ProductForm}
        options={{ headerTitle: "Produto", headerTitleAlign: "center" }}
      />
      <AppStack.Screen
        name="BrandList"
        component={BrandList}
        options={{ headerTitle: "Marcas", headerTitleAlign: "center" }}
      />
      <AppStack.Screen
        name="BrandForm"
        component={BrandForm}
        options={{ headerTitle: "Marca", headerTitleAlign: "center" }}
      />
      <AppStack.Screen
        name="ProductBrandList"
        component={ProductBrandList}
        options={{ headerTitle: "Marcas", headerTitleAlign: "center" }}
      /> */}
    </AppStack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default function AppRoutes() {
  const { setUser, setToken, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("entrou");

      const credentials = await AsyncStorage.getItem("@userCredentials");
      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        const userResponse = await login(email, password);

        if (!userResponse.erro) {
          const { name, token } = userResponse.data;
          setUser({ name });
          setToken(token);
        }
      }
    } catch (error) {
      console.error("Erro ao tentar autenticar automaticamente:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}
