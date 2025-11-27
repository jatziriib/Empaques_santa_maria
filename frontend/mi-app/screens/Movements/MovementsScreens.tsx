// screens/Movements/MovementsScreens.tsx
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

export default function MovementsScreens() {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");

  const [movements, setMovements] = useState([
    {
      id_movimiento: "1",
      tipo_movimiento: "Entrada de materia",
      cantidad: 10,
      usuario: "Lluvia",
      materia_prima: "Madera",
      producto_terminado: "",
      fecha_movimiento: "2024-05-01 10:00",
    },
    {
      id_movimiento: "2",
      tipo_movimiento: "Salida producto terminado",
      cantidad: 5,
      usuario: "Fátima",
      materia_prima: "",
      producto_terminado: "Caja",
      fecha_movimiento: "2024-05-02 15:30",
    },
  ]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<any>(null);

  const openDeleteModal = (movement: any) => {
    setSelectedMovement(movement);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setMovements(prev =>
      prev.filter(m => m.id_movimiento !== selectedMovement.id_movimiento)
    );
    setDeleteModalVisible(false);
  };

  const renderMovement = ({ item }: any) => (
    <View style={styles.row}>
      {/* Tipo de movimiento con chip */}
      <View style={[styles.statusChip]}>
        <Text style={styles.statusText}>{item.tipo_movimiento}</Text>
      </View>

      <Text style={styles.cell}>{item.cantidad}</Text>
      <Text style={styles.cell}>{item.usuario}</Text>

      <Text style={styles.cell}>
        {item.materia_prima || item.producto_terminado}
      </Text>

      <Text style={styles.cellSmall}>{item.fecha_movimiento}</Text>

      {/* Botón Editar */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditMovement", { movement: item })}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>

      {/* Botón eliminar */}
      <TouchableOpacity onPress={() => openDeleteModal(item)}>
        <Ionicons name="trash-outline" size={22} color="#0F6B35" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FILTROS */}
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <Ionicons name="search-outline" size={18} color="#555" />
          <TextInput
            placeholder="Buscar movimiento"
            style={styles.filterInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity style={styles.filterBox}>
          <Text style={styles.filterPlaceholder}>Tipo</Text>
          <Ionicons name="chevron-down" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ENCABEZADOS */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Cant.</Text>
        <Text style={styles.headerText}>Usuario</Text>
        <Text style={styles.headerText}>Materia/Prod.</Text>
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}></Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={movements}
        keyExtractor={item => item.id_movimiento}
        renderItem={renderMovement}
      />

      {/* BOTÓN CREAR MOVIMIENTO */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("CreateMovement")}
      >
        <Text style={styles.createBtnText}>Crear movimiento</Text>
      </TouchableOpacity>

      {/* MODAL ELIMINAR */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trash-outline" size={80} color="#0F6B35" />

            <Text style={styles.modalText}>
              ¿Seguro de eliminar este movimiento?
            </Text>

            <View style={styles.modalButtons}>
              {/* Cancelar */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>

              {/* Eliminar */}
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

/* ------------------- ESTILOS ------------------- */
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
    marginTop: 16,
    paddingBottom: 8,
  },

  headerText: {
    flex: 1,
    fontWeight: "600",
    color: "#555",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  cell: { flex: 1, fontSize: 12 },
  cellSmall: { flex: 1.2, fontSize: 11 },

  /* CHIP VERDE */
  statusChip: {
    backgroundColor: "#0F6B35",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    flex: 1.3,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 11,
  },

  /* EDITAR */
  editBtn: { paddingHorizontal: 6 },
  editText: {
    color: "#0F6B35",
    borderWidth: 1,
    borderColor: "#0F6B35",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 11,
  },

  /* CREAR */
  createBtn: {
    backgroundColor: "#0F6B35",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  createBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  /* MODAL */
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
