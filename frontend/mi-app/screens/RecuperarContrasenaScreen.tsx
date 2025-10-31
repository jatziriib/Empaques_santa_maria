import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function RecuperarContrasena({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [otp, setOtp] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [paso, setPaso] = useState(1); //paoss= 1enviar correo, 2verificar codigo, 3restablecercontrasena

  const enviarCorreo = async () => {
    try {
      const res = await fetch("http://192.168.1.158:4000/autenticacion/olvido-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await res.json();
      if (!res.ok) return Alert.alert("Error", data.message || "Error al enviar OTP");
      Alert.alert("Éxito", "Código enviado a tu correo");
      setPaso(2);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo enviar el código. Intenta de nuevo.");
    }
  };

  const verificarCodigo = async () => {
    try {
      const res = await fetch("http://192.168.1.158:4000/autenticacion/verificar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, otp }),
      });
      const data = await res.json();
      if (!res.ok) return Alert.alert("Error", data.message || "Código inválido");
      Alert.alert("Éxito", "Código verificado. Ahora ingresa tu nueva contraseña.");
      setPaso(3);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo verificar el código.");
    }
  };

  const restablecerContrasena = async () => {
    try {
      const res = await fetch("http://192.168.1.158:4000/autenticacion/restablecer-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, nueva_contrasena: nuevaContrasena }),
      });
      const data = await res.json();
      if (!res.ok) return Alert.alert("Error", data.message || "Error al restablecer contraseña");
      Alert.alert("Éxito", "Contraseña restablecida. Ahora inicia sesión.");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo restablecer la contraseña.");
    }
  };

  return (
    <View style={styles.container}>
      {paso === 1 && (
        <>
          <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
          <TouchableOpacity style={styles.button} onPress={enviarCorreo}>
            <Text style={styles.buttonText}>Enviar código</Text>
          </TouchableOpacity>
        </>
      )}

      {paso === 2 && (
        <>
          <TextInput style={styles.input} placeholder="Código OTP" value={otp} onChangeText={setOtp} keyboardType="numeric" />
          <TouchableOpacity style={styles.button} onPress={verificarCodigo}>
            <Text style={styles.buttonText}>Verificar código</Text>
          </TouchableOpacity>
        </>
      )}

      {paso === 3 && (
        <>
          <TextInput style={styles.input} placeholder="Nueva contraseña" value={nuevaContrasena} onChangeText={setNuevaContrasena} secureTextEntry />
          <TouchableOpacity style={styles.button} onPress={restablecerContrasena}>
            <Text style={styles.buttonText}>Restablecer contraseña</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  input: { width: "90%", padding: 12, marginVertical: 8, borderRadius: 10, backgroundColor: "#fff", elevation: 2 },
  button: { width: "90%", padding: 12, backgroundColor: "#0A6535", borderRadius: 10, alignItems: "center", marginTop: 15, elevation: 3 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
