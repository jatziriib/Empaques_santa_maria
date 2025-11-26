import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// Pantallas
import ResumenScreen from "../screens/ResumenScreen";
import UsersScreens from "../screens/Users/UsersScreens";
import ProductsListScreen from "../screens/Products/ProductsListScreen";
import MaterialsScreens from "../screens/Materials/MaterialsScreens";
import MovementsScreens from "../screens/Movements/MovementsScreens";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Resumen"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#0F6B35",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      {/* RESUMEN */}
      <Drawer.Screen
        name="Resumen"
        component={ResumenScreen}
        options={{
          title: "Resumen",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* USUARIOS */}
      <Drawer.Screen
        name="Usuarios"
        component={UsersScreens}
        options={{
          title: "Usuarios",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />

      {/* PRODUCTOS */}
      <Drawer.Screen
        name="Productos"
        component={ProductsListScreen}
        options={{
          title: "Productos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />

      {/* MATERIA PRIMA */}
      <Drawer.Screen
        name="MateriaPrima"
        component={MaterialsScreens}
        options={{
          title: "Materia Prima",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" color={color} size={size} />
          ),
        }}
      />

      {/* MOVIMIENTOS */}
      <Drawer.Screen
        name="Movimientos"
        component={MovementsScreens}
        options={{
          title: "Movimientos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="swap-vertical-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
