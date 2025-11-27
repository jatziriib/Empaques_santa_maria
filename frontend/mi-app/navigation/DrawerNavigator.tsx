import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

// Pantallas
import ResumenScreen from "../screens/ResumenScreen";
import UsersScreens from "../screens/Users/UsersScreens";
import ProductsListScreen from "../screens/Products/ProductsListScreen";
import MaterialsScreens from "../screens/Materials/MaterialsScreens";
import MovementsScreens from "../screens/Movements/MovementsScreens";

const Drawer = createDrawerNavigator();

/* ============================================================
    FUNCIÓN PARA FORMATEAR ROL
============================================================ */

const formatearRol = (rol: string | undefined) => {
  if (!rol) return "Sin rol";

  const map: Record<string, string> = {
    administrador: "Administrador",
    encargadotarimas: "Encargado de Tarimas",
    encargadocompras: "Encargado de Compras",
  };

  return map[rol] || rol.charAt(0).toUpperCase() + rol.slice(1);
};

/* ============================================================
    DRAWER PRINCIPAL
============================================================ */

export default function DrawerNavigator() {
  const { usuario } = useAuth();
  const rol = usuario?.rol || "administrador";

  return (
    <Drawer.Navigator
      initialRouteName="Resumen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#0F6B35",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      {/* TODOS LOS ROLES VEN RESUMEN */}
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

      {/* SOLO ADMINISTRADOR → Usuarios */}
      {rol === "administrador" && (
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
      )}

      {/* ADMIN + ENCARGADO TARIMAS → Productos */}
      {(rol === "administrador" || rol === "encargadotarimas") && (
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
      )}

      {/* ADMIN + ENCARGADO TARIMAS → Materia Prima */}
      {(rol === "administrador" || rol === "encargadotarimas") && (
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
      )}

      {/* ADMIN + ENCARGADO TARIMAS + ENCARGADO COMPRAS → Movimientos */}
      {(rol === "administrador" ||
        rol === "encargadotarimas" ||
        rol === "encargadocompras") && (
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
      )}
    </Drawer.Navigator>
  );
}

/* ============================================================
    CUSTOM DRAWER (HEADER + CERRAR SESIÓN)
============================================================ */

function CustomDrawerContent(props: any) {
  const { usuario, cerrarSesion } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        
        {/* HEADER DEL MENU */}
        <View style={styles.header}>
          <View>
            <Text style={styles.username}>{usuario?.correo || "Usuario"}</Text>
            <Text style={styles.role}>{formatearRol(usuario?.rol)}</Text>
          </View>
        </View>

        {/* ITEMS DEL MENÚ */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="log-out-outline" size={22} color="#B00020" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* MODAL CONFIRMAR */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle-outline" size={70} color="#0F6B35" />
            <Text style={styles.modalText}>
              ¿Seguro que deseas cerrar sesión?
            </Text>

            <View style={styles.modalButtons}>
              {/* Cancelar */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>

              {/* Confirmar */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  cerrarSesion();
                  props.navigation.navigate("Login");
                }}
              >
                <Text style={styles.deleteText}>Sí, cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ============================================================
    ESTILOS
============================================================ */

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  role: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  logoutText: {
    fontSize: 16,
    color: "#B00020",
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0F6B35",
    alignItems: "center",
  },
  cancelText: {
    color: "#0F6B35",
    fontWeight: "600",
  },
  deleteBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#0F6B35",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
