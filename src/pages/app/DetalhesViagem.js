import logo from "../../../assets/logo.png";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { excluirViagem, finalizarViagem } from "../../services/ViagemService";
import { useAuth } from "../../context/AuthContext";

export default function DetalhesViagem({ navigation }) {
  const route = useRoute();
  const { viagem } = route.params;
  const { token } = useAuth();
  const [modal, setModal] = useState(false);
  const [modalFinalizarViagem, setmodalFinalizarViagem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const excluirMinhaViagem = async () => {
    try {
      setIsLoading(true);
      const response = await excluirViagem(viagem.id, token);

      if (response) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModal(false);
      setIsLoading(false);
    }
  };

  const finalizarMinhaViagem = async () => {
    try {
      setIsLoading(true);
      const response = await finalizarViagem(
        viagem.id,
        viagem.nome,
        viagem.dataIda,
        viagem.dataVolta,
        viagem.valorPrv,
        viagem.valorReal,
        viagem.latitude,
        viagem.longitude,
        token
      );

      if (response) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rowTitulo}>
          <Text style={styles.tripName}>
            {viagem.nome.length > 25
              ? `${viagem.nome.substring(0, 25)}...`
              : viagem.nome}
          </Text>
          <View
            style={[
              styles.statusBadge,
              viagem.statusId === 1
                ? styles.statusAtual
                : styles.statusFinalizada,
            ]}
          >
            <Ionicons
              name="location-outline"
              size={14}
              color="#FFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.statusText}>
              {viagem.statusId === 1 ? "Atual" : "Finalizada"}
            </Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.dateText}>
            {dayjs(viagem.dataIda).format("DD MMM")} -{" "}
            {dayjs(viagem.dataVolta).format("DD MMM YYYY")}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MeusGastos", { viagem })}
        >
          <Text style={styles.buttonText}>Meus Gastos</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={
              viagem.statusId === 1
                ? styles.finalizeButton
                : styles.finalizeButtonDisabled
            }
            onPress={() => setmodalFinalizarViagem(true)}
            disabled={isLoading || viagem.statusId === 2}
          >
            <MaterialCommunityIcons
              name="airplane-landing"
              size={16}
              color="#FFF"
            />
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setModal(true)}
          >
            <Ionicons name="trash-outline" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Localização</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(viagem.latitude),
            longitude: parseFloat(viagem.longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(viagem.latitude),
              longitude: parseFloat(viagem.longitude),
            }}
            title={viagem.nome}
            description={`Viagem realizada por ${viagem.usuario.nome}`}
          />
        </MapView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Você tem certeza que deseja excluir esta viagem?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={excluirMinhaViagem}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalButtonText}>Sim, Excluir</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButtonCancel,
                  isLoading && styles.disabledButton,
                ]}
                onPress={() => setModal(false)}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFinalizarViagem}
        onRequestClose={() => setmodalFinalizarViagem(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Você tem certeza que deseja finalizar esta viagem?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButtonConfirm,
                  { backgroundColor: "#0E6EFF" },
                ]}
                onPress={finalizarMinhaViagem}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalButtonText}>Sim, Finalizar</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButtonCancel,
                  isLoading && styles.disabledButton,
                ]}
                onPress={() => setmodalFinalizarViagem(false)}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00050D",
    paddingHorizontal: 25,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 5,
    left: 5,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  infoContainer: {
    marginTop: 40,
  },
  tripName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    alignItems: "start",
  },
  rowTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#AAA",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 26,
    marginLeft: 10,
  },
  statusAtual: {
    backgroundColor: "#4CAF50",
  },
  statusFinalizada: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#FFF",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#888",
    marginVertical: 20,
    width: "100%",
  },
  actionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#071222",
    paddingVertical: 15,
    borderRadius: 26,
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  finalizeButton: {
    flex: 1,
    backgroundColor: "#0E6EFF",
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 26,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  finalizeButtonDisabled: {
    flex: 1,
    backgroundColor: "#0A4DB3",
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 26,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    opacity: 0.6,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#F44336",
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 26,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 6,
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },

  map: {
    flex: 1,
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 22,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 30,
    backgroundColor: "#071222",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between", 
    width: "100%", 
    marginTop: 20, 
  },
  modalButtonConfirm: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 140,
  },
  modalButtonCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 140,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
