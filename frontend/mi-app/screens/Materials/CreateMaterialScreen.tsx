// screens/Materials/CreateMaterialScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreateMaterialScreen({ navigation }: any) {
  const [tipo, setTipo] = useState("");
  const [ancho, setAncho] = useState("");
  const [largo, setLargo] = useState("");
  const [stockActual, setStockActual] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");

  const handleCreate = () => {
    // Aquí después haces el POST al backend
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* TIPO */}
      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de material"
        value={tipo}
        onChangeText={setTipo}
      />

      {/* ANCHO / LARGO */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>Ancho</Text>
          <TextInput
            style={styles.input}
            placeholder="Ancho"
            value={ancho}
            onChangeText={setAncho}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Largo</Text>
          <TextInput
            style={styles.input}
            placeholder="Largo"
            value={largo}
            onChangeText={setLargo}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* STOCK ACTUAL */}
      <Text style={styles.label}>Stock Actual*</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad actual"
        value={stockActual}
        onChangeText={setStockActual}
        keyboardType="numeric"
      />

      {/* STOCK MINIMO */}
      <Text style={styles.label}>Stock Mínimo*</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad mínima"
        value={stockMinimo}
        onChangeText={setStockMinimo}
        keyboardType="numeric"
      />

      {/* BOTÓN CREAR */}
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear Materia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  logo: {
    width: 250,
    height: 80,
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
    fontSize: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    marginTop: 12,
  },

  button: {
    backgroundColor: "#0F6B35",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
