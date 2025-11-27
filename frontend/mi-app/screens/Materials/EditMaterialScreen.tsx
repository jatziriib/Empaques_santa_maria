// screens/Materials/EditMaterialScreen.tsx
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

export default function EditMaterialScreen({ route, navigation }: any) {
  const { material } = route.params;

  const [tipo, setTipo] = useState(material?.tipo || "");
  const [ancho, setAncho] = useState(material?.ancho?.toString() || "");
  const [largo, setLargo] = useState(material?.largo?.toString() || "");
  const [stockActual, setStockActual] = useState(material?.stockActual?.toString() || "");
  const [stockMinimo, setStockMinimo] = useState(material?.stockMinimo?.toString() || "");

  const handleUpdate = () => {
    console.log("Actualizando materia prima:", {
      tipo,
      ancho,
      largo,
      stockActual,
      stockMinimo,
    });

    // Aquí va tu PUT al backend...

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Tipo */}
      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo de material"
      />

      {/* Ancho / Largo */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>Ancho</Text>
          <TextInput
            style={styles.input}
            value={ancho}
            onChangeText={setAncho}
            keyboardType="numeric"
            placeholder="Ancho"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Largo</Text>
          <TextInput
            style={styles.input}
            value={largo}
            onChangeText={setLargo}
            keyboardType="numeric"
            placeholder="Largo"
          />
        </View>
      </View>

      {/* Stock Actual */}
      <Text style={styles.label}>Stock Actual*</Text>
      <TextInput
        style={styles.input}
        value={stockActual}
        onChangeText={setStockActual}
        keyboardType="numeric"
        placeholder="Cantidad actual"
      />

      {/* Stock Mínimo */}
      <Text style={styles.label}>Stock Mínimo*</Text>
      <TextInput
        style={styles.input}
        value={stockMinimo}
        onChangeText={setStockMinimo}
        keyboardType="numeric"
        placeholder="Cantidad mínima"
      />

      {/* Botón actualizar */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar Materia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  logoContainer: { alignItems: "center", marginVertical: 10 },
  logo: { width: 250, height: 80 },

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
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
