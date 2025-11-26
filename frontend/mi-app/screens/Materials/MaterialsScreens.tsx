// screens/Materials/MaterialsScreen.tsx
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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MaterialsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [materials, setMaterials] = useState([
    { id: "1", type: "Madera", status: "Activo", width: 200, height: 300, stock: 20 },
    { id: "2", type: "Madera", status: "Activo", width: 200, height: 300, stock: 20 },
  ]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  const openDeleteModal = (material: any) => {
    setSelectedMaterial(material);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setMaterials(prev => prev.filter(item => item.id !== selectedMaterial.id));
    setDeleteModalVisible(false);
  };

  const renderRow = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.type}</Text>

      <View style={styles.statusChip}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>

      <Text style={styles.cell}>{item.width}</Text>
      <Text style={styles.cell}>{item.height}</Text>
      <Text style={styles.cell}>{item.stock}</Text>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditMaterial", { material: item })}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>

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
            placeholder="Buscar producto"
            style={styles.filterInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity style={styles.filterBox}>
          <Text style={styles.filterPlaceholder}>Categoría</Text>
          <Ionicons name="chevron-down" size={18} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBox}>
          <Text style={styles.filterPlaceholder}>Status</Text>
          <Ionicons name="chevron-down" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      {/* ENCABEZADOS */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Ancho</Text>
        <Text style={styles.headerText}>Largo</Text>
        <Text style={styles.headerText}>Stock</Text>
        <Text style={styles.headerText}></Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={materials}
        keyExtractor={item => item.id}
        renderItem={renderRow}
      />

      {/* BOTÓN CREAR MATERIA PRIMA */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("CreateMaterial")}
      >
        <Text style={styles.createBtnText}>Crear materia prima</Text>
      </TouchableOpacity>

      {/* MODAL ELIMINAR */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trash-outline" size={80} color="#0F6B35" />
            <Text style={styles.modalText}>¿Seguro de eliminar esta materia?</Text>

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

// estilos
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

  statusChip: {
    backgroundColor: "#0F6B35",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: { color: "#fff", fontWeight: "600" },

  editBtn: { paddingHorizontal: 8 },
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
