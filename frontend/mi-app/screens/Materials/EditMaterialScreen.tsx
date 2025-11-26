import React, { useState, useEffect } from "react";
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

export default function EditMaterialScreen({ route, navigation }: any) {
  const { material } = route.params;

  // Estados con valores iniciales del material
  const [type, setType] = useState(material?.type || "");
  const [width, setWidth] = useState(material?.width?.toString() || "");
  const [height, setHeight] = useState(material?.height?.toString() || "");
  const [status, setStatus] = useState(material?.status || "");
  const [stock, setStock] = useState(material?.stock?.toString() || "");

  const handleUpdate = () => {
    // Aquí luego haces tu PUT o PATCH al backend
    console.log("Actualizando:", {
      type,
      width,
      height,
      status,
      stock,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Campos */}
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ancho</Text>
          <TextInput
            style={styles.input}
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Largo</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Activo</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />
      </View>

      {/* Botón actualizar */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar</Text>
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
    marginVertical: 16,
  },

  logo: {
    width: 200,
    height: 80,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  field: {
    flex: 1,
    marginRight: 8,
    marginBottom: 16,
  },

  label: {
    marginBottom: 4,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#0F6B35",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
