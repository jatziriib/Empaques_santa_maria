import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
// @ts-ignore
import { BarChart } from "react-native-chart-kit";


type BarChartPropsFix = {
  data: {
    labels: string[];
    datasets: { data: number[] }[];
  };
  width: number;
  height: number;
  chartConfig: any;
  style?: any;
  fromZero?: boolean;
};

const TypedBarChart = BarChart as unknown as React.FC<Partial<BarChartPropsFix>>;
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
  barPercentage: 0.6,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeDasharray: "", // quita las líneas punteadas
  },
};

const Resumen = () => {
  const data = {
    labels: ["Apr 4", "Apr 9", "Apr 15", "Apr 21", "Apr 27"],
    datasets: [
      {
        data: [40, 55, 30, 60, 75, 50, 80],
      },
    ],
  };

  const topProductos = [
    { nombre: "Nombre del producto", categoria: "Categoría", existencia: 423 },
    { nombre: "Nombre del producto", categoria: "Categoría", existencia: 423 },
    { nombre: "Nombre del producto", categoria: "Categoría", existencia: 423 },
    { nombre: "Nombre del producto", categoria: "Categoría", existencia: 423 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen</Text>

      {/* Tarjeta de resumen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrada de materia prima</Text>
        <Text style={styles.cardValue}>1,720</Text>
        <Text style={styles.cardPercent}>▲ 10.7%</Text>
      </View>

      {/* Gráfico */}
      <View style={styles.chartContainer}>
        <TypedBarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          style={styles.chart}
        />
        <Text style={styles.chartLabel}>Materia prima</Text>
      </View>

      {/* Lista de productos */}
      <View style={styles.listCard}>
        <Text style={styles.sectionTitle}>Top productos del mes</Text>
        {topProductos.map((item, index) => (
          <View key={index} style={styles.productRow}>
            <View>
              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productCategory}>{item.categoria}</Text>
            </View>
            <Text style={styles.productExistencia}>{item.existencia}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Resumen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    marginVertical: 8,
  },
  cardPercent: {
    color: "#28a745",
    fontWeight: "600",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  chartLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#444",
    marginTop: 8,
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
  productCategory: {
    fontSize: 12,
    color: "#999",
  },
  productExistencia: {
    fontSize: 14,
    fontWeight: "600",
  },
});
