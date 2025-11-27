import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResumenScreen() {
  // --- Datos simulados ---
  const [products, setProducts] = useState([
    { id: 1, name: "Tarima de madera", stock: 2, minStock: 3 },
    { id: 2, name: "Tarima de cartón", stock: 5, minStock: 2 },
    { id: 3, name: "Tarima azul", stock: 1, minStock: 2 },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, name: "Clavos", stock: 10, minStock: 5 },
    { id: 2, name: "Pegamento", stock: 3, minStock: 5 },
    { id: 3, name: "Madera", stock: 1, minStock: 3 },
  ]);

  // Filtrar productos y materia prima en mínimo
  const productosEnMinimo = products.filter((p) => p.stock <= p.minStock);
  const materialesEnMinimo = materials.filter((m) => m.stock <= m.minStock);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen</Text>

      {/* --- PRODUCTOS EN MÍNIMO --- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Productos en mínimo</Text>

        {productosEnMinimo.length === 0 ? (
          <Text style={styles.emptyText}>No hay productos en mínimo</Text>
        ) : (
          productosEnMinimo.map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>
                  Stock: {item.stock} | Mínimo: {item.minStock}
                </Text>
              </View>

              <Text style={styles.alertTag}>Bajo</Text>
            </View>
          ))
        )}
      </View>

      {/* --- MATERIA PRIMA EN MÍNIMO --- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Materia prima en mínimo</Text>

        {materialesEnMinimo.length === 0 ? (
          <Text style={styles.emptyText}>No hay materia prima en mínimo</Text>
        ) : (
          materialesEnMinimo.map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>
                  Stock: {item.stock} | Mínimo: {item.minStock}
                </Text>
              </View>

              <Text style={styles.alertTag}>Bajo</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
  },

  subText: {
    fontSize: 13,
    color: "#777",
  },

  alertTag: {
    backgroundColor: "#B00020",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontWeight: "600",
    alignSelf: "center",
  },
});
