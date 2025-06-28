import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function PreparationMethod({ preparationSteps }) {
  // Converte a string para array, caso seja necessário
  const formattedSteps = Array.isArray(preparationSteps)
    ? preparationSteps
    : typeof preparationSteps === "string"
      ? preparationSteps.split(",").map((step) => step.trim())
      : [];

  // Verifica se há passos de preparo disponíveis
  if (!formattedSteps || formattedSteps.length === 0) {
    return <Text style={styles.emptyText}>Nenhum modo de preparo disponível</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo de Preparo:</Text>
      <View style={styles.list}>
        {formattedSteps.map((item, index) => (
          <Text key={index} style={styles.stepItem}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    overflow: "hidden", // Evita que o conteúdo extrapole
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: "uppercase",
    marginBottom: 10,
  },
  stepItem: {
    color: "#DC9B00",
    fontSize: 20,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  list: {
    flexGrow: 0, // Evita que a lista cresça infinitamente
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
  },
  listContent: {
    paddingBottom: 10,
  },
});
