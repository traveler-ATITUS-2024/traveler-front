import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../utils/estilocalendario";
import CurrencyInput from "react-native-currency-input";

import { useAuth } from "../../context/AuthContext";
import logo from "../../../assets/logo.png";
import calendario from "../../../assets/calendario.png"
import relogio from "../../../assets/relogio.png"
import dayjs from "dayjs";

export default function CadastroDespesa({ navigation, route }) {
    const { token } = useAuth();
    const [calendarioVisivel, setCalendarioVisivel] = useState(false);

    return (
        <View>
            <View>
                <Image source={logo}/>
            </View>

            <View>
              <Text>Valor:</Text>
              <CurrencyInput
                keyboardType="numeric"
                placeholderTextColor="#FFFF"
                prefix="R$ "
              />
            </View>

            <View></View>

            <View>
                <TouchableOpacity>
                    <Image source={calendario}/>
                    <Text>Data do gasto</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={relogio}/>
                    <Text>Horário do gasto</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TextInput
                    placeholder="Adicionar título:"
                    placeholderTextColor="#888"
                />
                <View></View>
            </View>
                
        </View>
    )
}