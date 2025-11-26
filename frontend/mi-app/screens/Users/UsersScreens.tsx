import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UsersScreens() {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [users, setUsers] = useState([
    { id: "1", name: "Lluvia", role: "encargado", email: "vas@gmail.com" },
    { id: "2", name: "Fatima", role: "compras", email: "hgd@gmail.com" },
    { id: "3", name: "Madera", role: "Activo", email: "stock@example.com" },
  ]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    setDeleteModalVisible(false);
  };

  const renderUser = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>

      <View style={styles.roleChip}>
        <Text style={styles.roleText}>{item.role}</Text>
      </View>

      <Text style={styles.cell}>{item.email}</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditUser", { user: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openDeleteModal(item)}>
          <Ionicons name="trash-outline" size={22} color="#0F6B35" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FILTROS */}
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <Ionicons name="search-outline" size={18} color="#555" />
          <TextInput
            placeholder="Buscar usuario"
            style={styles.filterInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity style={styles.filterBox}>
          <Text style={styles.filterPlaceholder}>Rol</Text>
          <Ionicons name="chevron-down" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ENCABEZADOS */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Usuario</Text>
        <Text style={styles.headerText}>Rol</Text>
        <Text style={styles.headerText}>Correo</Text>
        <Text style={styles.headerText}>Editar/Eliminar</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderUser}
      />

      {/* BOTÓN CREAR USUARIO */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <Text style={styles.createBtnText}>Crear Usuario</Text>
      </TouchableOpacity>

      {/* MODAL ELIMINAR */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trash-outline" size={80} color="#0F6B35" />
            <Text style={styles.modalText}>
              ¿Seguro de eliminar este usuario?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  filterContainer: { flexDirection: "row", justifyContent: "space-between" },
  filterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  filterInput: { marginLeft: 6, flex: 1 },
  filterPlaceholder: { flex: 1, color: "#555" },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingBottom: 8,
  },
  headerText: { flex: 1, fontWeight: "500", color: "#555" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  cell: { flex: 1 },

  roleChip: {
    backgroundColor: "#0F6B35",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  roleText: { color: "#fff", fontWeight: "600" },

  editBtn: { paddingHorizontal: 8, marginRight: 4 },
  editText: {
    color: "#0F6B35",
    borderWidth: 1,
    borderColor: "#0F6B35",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  createBtn: {
    backgroundColor: "#0F6B35",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  createBtnText: { color: "#fff", fontSize: 17, fontWeight: "600" },

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
  modalText: { fontSize: 16, textAlign: "center", marginVertical: 20 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  cancelText: { color: "#0F6B35", fontWeight: "600" },
  deleteBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#0F6B35",
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "600" },
});
