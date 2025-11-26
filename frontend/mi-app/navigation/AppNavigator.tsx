import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginFormScreen from "../screens/LoginFormScreen";
import RegisterScreen from "../screens/RegisterScreen";

// Productos
import CreateProductScreen from "../screens/Products/CreateProductScreen";
import EditProductScreen from "../screens/Products/EditProductScreen";

// Materia prima 👇
import CreateMaterialScreen from "../screens/Materials/CreateMaterialScreen";
import EditMaterialScreen from "../screens/Materials/EditMaterialScreen";
// Usuarios 👇
import UsersScreens from "../screens/Users/UsersScreens";
import CreateUserScreen from "../screens/Users/CreateUserScreen";
import EditUserScreen from "../screens/Users/EditUserScreen";


// Drawer principal
import DrawerNavigator from "./DrawerNavigator";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  LoginForm: undefined;
  Register: undefined;
  Home: undefined;

  // Productos
  CreateProduct: undefined;
  EditProduct: { product: any };

  // Materia prima
  CreateMaterial: undefined;
  EditMaterial: { material: any };
  // Usuarios
  CreateUser: undefined;
  EditUser: { user: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Flujo inicial */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginForm" component={LoginFormScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Productos */}
        <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />

        {/* Materia prima */}
        <Stack.Screen name="CreateMaterial" component={CreateMaterialScreen} />
        <Stack.Screen name="EditMaterial" component={EditMaterialScreen} />

        {/* Usuarios */}
<Stack.Screen name="CreateUser" component={CreateUserScreen} />
<Stack.Screen name="EditUser" component={EditUserScreen} />


        {/* Drawer (Resumen, Usuarios, Productos, Materia, Movimientos) */}
        <Stack.Screen name="Home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
