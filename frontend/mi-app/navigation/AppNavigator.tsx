import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginFormScreen from "../screens/LoginFormScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResumenScreen from "../screens/ResumenScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  LoginForm: undefined;
  Register: undefined;
  Resumen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginForm" component={LoginFormScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Resumen" component={ResumenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
