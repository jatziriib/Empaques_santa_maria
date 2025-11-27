import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductsListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");

  // --- Lista simulada con stock mínimo ---
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Tarima de madera",
      stock: 5,
      minStock: 2,
    },
    {
      id: "2",
      name: "Tarima de cartón",
      stock: 1,
      minStock: 2,
    },
  ]);

  // --- ALERTA AUTOMÁTICA DE STOCK BAJO ---
  useEffect(() => {
    const bajos = products.filter((p) => p.stock <= p.minStock);

    if (bajos.length > 0) {
      let nombres = bajos.map((p) => `• ${p.name}`).join("\n");

      Alert.alert(
        "⚠️ Stock bajo",
        `Los siguientes productos han alcanzado el mínimo:\n\n${nombres}`,
        [{ text: "Entendido", style: "default" }]
      );
    }
  }, []);

  // Modal eliminar
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const openDeleteModal = (product: any) => {
    setSelectedProduct(product);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((item) => item.id !== selectedProduct.id));
    setDeleteModalVisible(false);
  };

  // --- Render de cada fila ---
  const renderProduct = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>

      {/* CHIP DE STATUS SEGÚN STOCK */}
      {item.stock <= item.minStock ? (
        <View style={[styles.statusChip, { backgroundColor: "#B00020" }]}>
          <Text style={styles.statusText}>Stock bajo</Text>
        </View>
      ) : (
        <View style={[styles.statusChip, { backgroundColor: "#0F6B35" }]}>
          <Text style={styles.statusText}>En stock</Text>
        </View>
      )}

      <Text style={styles.cell}>{item.stock} en existencia</Text>
      <Text style={styles.cell}>{item.minStock} mínimo</Text>

      {/* EDITAR */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProduct", { product: item })}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>

      {/* BORRAR */}
      <TouchableOpacity onPress={() => openDeleteModal(item)}>
        <Ionicons name="trash-outline" size={22} color="#0F6B35" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* --- Filtro búsqueda --- */}
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
      </View>

      {/* Encabezado */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Producto</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Inventario</Text>
        <Text style={styles.headerText}>Mínimo</Text>
        <Text style={styles.headerText}></Text>
      </View>

      {/* Lista */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />

      {/* Botón crear */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("CreateProduct")}
      >
        <Text style={styles.createBtnText}>Crear producto</Text>
      </TouchableOpacity>

      {/* Modal eliminar */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trash-outline" size={80} color="#0F6B35" />

            <Text style={styles.modalText}>¿Seguro de eliminar este producto?</Text>

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

/* --- ESTILOS ORIGINALES (MANTENIDOS) --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

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

  filterInput: {
    marginLeft: 6,
    flex: 1,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingBottom: 8,
  },

  headerText: {
    flex: 1,
    fontWeight: "500",
    color: "#555",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  cell: {
    flex: 1,
  },

  statusChip: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  editBtn: {
    paddingHorizontal: 8,
  },

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

  createBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
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
