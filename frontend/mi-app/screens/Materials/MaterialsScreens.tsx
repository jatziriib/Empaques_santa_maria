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

  // DATOS EJEMPLO
  const [materials, setMaterials] = useState([
    { id: "1", type: "Tarima A", width: 200, height: 300, stockActual: 3, stockMinimo: 5 },
    { id: "2", type: "Tarima B", width: 220, height: 240, stockActual: 8, stockMinimo: 4 },
    { id: "3", type: "Tarima C", width: 180, height: 290, stockActual: 2, stockMinimo: 2 },
  ]);

  // MODAL ELIMINAR
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  // MODAL STOCK BAJO
  const [lowStockModal, setLowStockModal] = useState(false);
  const [materialLowStock, setMaterialLowStock] = useState<any>(null);

  const openDeleteModal = (material: any) => {
    setSelectedMaterial(material);
    setDeleteModalVisible(true);
  };

  const openLowStockAlert = (material: any) => {
    setMaterialLowStock(material);
    setLowStockModal(true);
  };

  const handleDelete = () => {
    setMaterials(prev => prev.filter(item => item.id !== selectedMaterial.id));
    setDeleteModalVisible(false);
  };

  // RENDER FILA
  const renderRow = ({ item }: any) => {
    const isLowStock = item.stockActual <= item.stockMinimo;

    return (
      <View style={styles.row}>
        {/* Tipo */}
        <Text style={styles.cell}>{item.type}</Text>

        {/* CHIP STATUS */}
        <View style={styles.statusChip}>
          <Text style={styles.statusText}>Activo</Text>
        </View>

        {/* Ancho */}
        <Text style={styles.cell}>{item.width}</Text>

        {/* Largo */}
        <Text style={styles.cell}>{item.height}</Text>

        {/* Stock */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.cell, isLowStock && styles.lowStockText]}>
            {item.stockActual}
          </Text>

          {/* Ícono de alerta */}
          {isLowStock && (
            <TouchableOpacity onPress={() => openLowStockAlert(item)}>
              <Ionicons name="alert-circle" size={22} color="#E0A800" />
            </TouchableOpacity>
          )}
        </View>

        {/* Botón editar */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditMaterial", { material: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        {/* Botón eliminar */}
        <TouchableOpacity onPress={() => openDeleteModal(item)}>
          <Ionicons name="trash-outline" size={22} color="#0F6B35" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* FILTRO */}
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <Ionicons name="search-outline" size={18} color="#555" />
          <TextInput
            placeholder="Buscar materia prima"
            style={styles.filterInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* ENCABEZADO TABLA */}
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

      {/* BOTÓN CREAR */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("CreateMaterial")}
      >
        <Text style={styles.createBtnText}>Crear materia prima</Text>
      </TouchableOpacity>

      {/* MODAL STOCK BAJO */}
      <Modal transparent visible={lowStockModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle-outline" size={70} color="#0F6B35" />

            <Text style={styles.modalText}>
              {materialLowStock?.type} está en nivel mínimo de stock 
              {"\n"}(Actual: {materialLowStock?.stockActual} / Mínimo: {materialLowStock?.stockMinimo})
            </Text>

            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => setLowStockModal(false)}
            >
              <Text style={styles.acceptText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trash-outline" size={80} color="#0F6B35" />

            <Text style={styles.modalText}>
              ¿Seguro de eliminar esta materia?
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

/* ------------------- ESTILOS ------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  filterContainer: { flexDirection: "row", marginBottom: 10 },
  filterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  filterInput: { marginLeft: 6, flex: 1 },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerText: { flex: 1, fontWeight: "600", color: "#555" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
  },
  cell: { flex: 1 },

  statusChip: {
    backgroundColor: "#0F6B35",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: { color: "#fff", fontWeight: "700" },

  lowStockText: { color: "#D00000", fontWeight: "700" },

  editBtn: { paddingHorizontal: 8 },
  editText: {
    color: "#0F6B35",
    borderWidth: 1,
    borderColor: "#0F6B35",
    paddingHorizontal: 8,
    paddingVertical: 2,
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

  // MODALES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    width: "78%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  modalText: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
    fontWeight: "500",
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
  cancelText: { color: "#0F6B35", fontWeight: "600" },

  deleteBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#0F6B35",
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "600" },

  acceptBtn: {
    backgroundColor: "#0F6B35",
    padding: 12,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginTop: 10,
  },
  acceptText: { color: "#fff", fontWeight: "700" },
});
