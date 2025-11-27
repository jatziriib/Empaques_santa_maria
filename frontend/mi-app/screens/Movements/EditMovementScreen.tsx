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
import { Picker } from "@react-native-picker/picker";

export default function EditMovementScreen({ route, navigation }: any) {
  const { movement } = route.params;

  const [tipo, setTipo] = useState(movement?.tipo_movimiento || "");
  const [cantidad, setCantidad] = useState(String(movement?.cantidad || ""));
  const [usuario, setUsuario] = useState(movement?.usuario || "");
  const [materiaPrima, setMateriaPrima] = useState(movement?.materia_prima || "");
  const [productoTerminado, setProductoTerminado] = useState(
    movement?.producto_terminado || ""
  );

  const handleUpdate = () => {
    console.log("Actualizando movimiento:", {
      tipo,
      cantidad,
      usuario,
      materiaPrima,
      productoTerminado,
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

      {/* Picker tipo de movimiento */}
      <Text style={styles.label}>Tipo de movimiento*</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipo} onValueChange={(value) => setTipo(value)}>
          <Picker.Item label="Seleccionar..." value="" />
          <Picker.Item label="Entrada de materia" value="entrada_materia" />
          <Picker.Item label="Salida producto terminado" value="salida_producto" />
          <Picker.Item label="Actualización" value="actualizacion" />
          <Picker.Item label="Eliminación" value="eliminacion" />
          <Picker.Item label="Devolución" value="devolucion" />
        </Picker>
      </View>

      {/* Usuario */}
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      {/* ---- FORMULARIO DINÁMICO ---- */}

      {/* Entrada de materia */}
      {tipo === "entrada_materia" && (
        <>
          <Text style={styles.label}>Materia prima*</Text>
          <TextInput
            style={styles.input}
            value={materiaPrima}
            onChangeText={setMateriaPrima}
          />

          <Text style={styles.label}>Cantidad*</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Salida producto terminado */}
      {tipo === "salida_producto" && (
        <>
          <Text style={styles.label}>Producto terminado*</Text>
          <TextInput
            style={styles.input}
            value={productoTerminado}
            onChangeText={setProductoTerminado}
          />

          <Text style={styles.label}>Cantidad*</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Actualización */}
      {tipo === "actualizacion" && (
        <>
          <Text style={styles.label}>Materia prima o producto*</Text>
          <TextInput
            style={styles.input}
            value={materiaPrima}
            onChangeText={setMateriaPrima}
            placeholder="Nombre"
          />

          <Text style={styles.label}>Cantidad*</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Eliminación */}
      {tipo === "eliminacion" && (
        <>
          <Text style={styles.label}>Elemento a eliminar*</Text>
          <TextInput
            style={styles.input}
            value={materiaPrima}
            onChangeText={setMateriaPrima}
            placeholder="Materia prima o producto"
          />
        </>
      )}

      {/* Devolución */}
      {tipo === "devolucion" && (
        <>
          <Text style={styles.label}>Producto o materia*</Text>
          <TextInput
            style={styles.input}
            value={productoTerminado}
            onChangeText={setProductoTerminado}
          />

          <Text style={styles.label}>Cantidad devuelta*</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </>
      )}

      {/* Botón actualizar */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar movimiento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ===================== ESTILOS ===================== */
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
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
