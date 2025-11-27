import 'react-native-reanimated';
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 280,
    height: 150,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#1b5e20",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  registerButton: {
    borderColor: "#1b5e20",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  registerText: {
    color: "#1b5e20",
    fontSize: 16,
  },
});
