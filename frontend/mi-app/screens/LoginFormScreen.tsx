import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { usrAuth } from "../context/AuthContext";

export default function LoginFormScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { iniciarSesion } = usrAuth();

  const handleLogin = async () => {
    try {
      const respuesta = await fetch("http://192.168.1.158:4000/autenticacion/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert("Error", data.message || "Credenciales inválidas");
        return;
      }

      //guardar el token y datos en el contexto
      await iniciarSesion(data.token, { correo });

      navigation.navigate("Resumen");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo iniciar sesión. Intenta de nuevo.");
    }
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
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
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

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace al registro */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tienes cuenta?</Text>
      </TouchableOpacity>

      {/*Recuperar contrasena*/}
      <TouchableOpacity onPress={() => navigation.navigate("RecuperarContrasena")}>
        <Text style={styles.link}>¿Olvidaste tu contrasena?</Text>
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
