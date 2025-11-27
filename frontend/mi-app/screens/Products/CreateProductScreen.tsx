import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreateProductScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [stockActual, setStockActual] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");

  const handleCreate = () => {
    console.log("Producto creado");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Crear nuevo producto</Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre o descripción*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre o identificación de la tarima"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Stock actual */}
      <Text style={styles.label}>Stock actual*</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad actual"
        keyboardType="numeric"
        value={stockActual}
        onChangeText={setStockActual}
      />

      {/* Stock mínimo */}
      <Text style={styles.label}>Stock mínimo*</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad mínima"
        keyboardType="numeric"
        value={stockMinimo}
        onChangeText={setStockMinimo}
      />

      {/* Botón crear */}
      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.btnText}>Crear producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 25,
    color: "#000",
  },

  label: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
  },

  createBtn: {
    backgroundColor: "#0F6B35",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
