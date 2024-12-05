import React, { useState } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/authService";
import casinha from "../../assets/casinha.png";
import pessoa from "../../assets/pessoa.png";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/app/ForgotPassword";
import Home from "../pages/app/Home";
import PlacesAutocomplete from "../pages/app/PlacesAutocomplete";
import CadastroViagem from "../pages/app/CadastroViagem";
import DetalhesViagem from "../pages/app/DetalhesViagem";
import MeusGastos from "../pages/app/MeusGastos";
import Perfil from "../pages/app/Perfil";
import EditarNome from "../pages/app/EditarNome";
import EditarSenha from "../pages/app/EditarSenha";
import CadastroDespesa from "../pages/app/CadastroDespesa";
import DespesaPorCategoria from "../pages/app/DespesaPorCategoria";
import TodasDespesas from "../pages/app/TodasDespesas";

const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#00050D",
          height: 55,
          paddingTop: 28,
          paddingBottom: 55,
        },
        tabBarActiveTintColor: "#0E6EFF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={AppNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={casinha}
              style={{
                width: 32,
                height: 32,
                tintColor: focused ? "#0E6EFF" : "rgba(255,255,255,0.5)",
                marginBottom: -5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#0E6EFF" : "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
            ></Text>
          ),
        }}
      />
      <Tab.Screen
        name="PerfilTab"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={pessoa}
              style={{
                width: 32,
                height: 32,
                tintColor: focused ? "#0E6EFF" : "rgba(255,255,255,0.5)",
                marginBottom: -5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#0E6EFF" : "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
            ></Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="PlacesAutocomplete"
        component={PlacesAutocomplete}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="CadastroViagem"
        component={CadastroViagem}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="CadastroDespesa"
        component={CadastroDespesa}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="DespesaPorCategoria"
        component={DespesaPorCategoria}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="DetalhesViagem"
        component={DetalhesViagem}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="MeusGastos"
        component={MeusGastos}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="EditarNome"
        component={EditarNome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="EditarSenha"
        component={EditarSenha}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{ headerShown: false }}
      />
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

  return user ? <TabRoutes /> : <AuthNavigator />;
}
