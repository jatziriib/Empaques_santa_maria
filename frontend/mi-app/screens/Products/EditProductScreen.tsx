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

export default function EditProductScreen({ navigation, route }: any) {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [status, setStatus] = useState(product.status);
  const [stock, setStock] = useState(String(product.stock));
  const [category, setCategory] = useState(product.category);

  const handleUpdate = () => {
    console.log("Producto actualizado");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Editar producto</Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={name}
        onChangeText={setName}
      />

      {/* Status */}
      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Activo / Inactivo"
        value={status}
        onChangeText={setStatus}
      />

      {/* Existencia */}
      <Text style={styles.label}>En existencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      {/* Categoría */}
      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Categoría"
        multiline
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Actualizar</Text>
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

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 16,
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    minHeight: 90,
  },

  updateBtn: {
    backgroundColor: "#0F6B35",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
