import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");



  const handleRegistrar = async () => {
    try {
      const respuesta = await fetch("http://192.168.1.158:4000/autenticacion/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellidos, correo, contrasena, rol }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert("Error", data.message || "Error al registrar usuario");
        return;
      }

      //se pasa a la vista
      navigation.navigate("Resumen");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo registrar intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rol}
          onValueChange={(itemValue) => setRol(itemValue)}
        >
          <Picker.Item label="Selecciona un rol" value="" />
          <Picker.Item label="Jefe" value="jefe" />
          <Picker.Item label="Trabajador" value="trabajador" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegistrar}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta?</Text>
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
    marginVertical: 8,
    elevation: 2,
  },
  pickerContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
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
