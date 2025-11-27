// screens/Movements/EditMovementScreen.tsx
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

export default function EditMovementScreen({ route, navigation }: any) {
  const { movement } = route.params;

  const [tipo, setTipo] = useState(movement?.tipo_movimiento || "");
  const [cantidad, setCantidad] = useState(
    movement?.cantidad?.toString() || ""
  );
  const [usuario, setUsuario] = useState(movement?.usuario || "");
  const [materiaPrima, setMateriaPrima] = useState(
    movement?.materia_prima || ""
  );
  const [productoTerminado, setProductoTerminado] = useState(
    movement?.producto_terminado || ""
  );
  const [fecha, setFecha] = useState(movement?.fecha_movimiento || "");

  const handleUpdate = () => {
    // Aquí iría el PUT/PATCH al backend
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.label}>Tipo de movimiento</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Materia prima (opcional)</Text>
      <TextInput
        style={styles.input}
        value={materiaPrima}
        onChangeText={setMateriaPrima}
      />

      <Text style={styles.label}>Producto terminado (opcional)</Text>
      <TextInput
        style={styles.input}
        value={productoTerminado}
        onChangeText={setProductoTerminado}
      />

      <Text style={styles.label}>Fecha</Text>
      <TextInput style={styles.input} value={fecha} onChangeText={setFecha} />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar movimiento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  logoContainer: { alignItems: "center", marginVertical: 16 },
  logo: { width: 220, height: 80 },

  label: { marginTop: 10, marginBottom: 4, fontWeight: "600" },
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
    marginTop: 24,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
