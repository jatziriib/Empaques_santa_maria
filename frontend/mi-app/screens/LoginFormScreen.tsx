import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function LoginFormScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Aquí podrías agregar tu validación o lógica de autenticación
  const handleLogin = () => {
    // En un futuro podrías validar con API, por ahora navega directo:
    navigation.navigate("Resumen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        placeholderTextColor="#777"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
        placeholderTextColor="#777"
      />

      {/* 🔹 Botón de inicio de sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    elevation: 2,
  },
  button: {
    backgroundColor: "#0A6535",
    paddingVertical: 12,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 15,
    color: "#555",
    fontSize: 14,
  },
});
