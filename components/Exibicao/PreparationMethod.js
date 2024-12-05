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
      <FlatList
        data={formattedSteps}
        keyExtractor={(item, index) => index.toString()} // Evitar conflitos de key
        renderItem={({ item }) => (
          <Text style={styles.stepItem}>{item}</Text>
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    maxHeight: 250, // Restringe a altura do contêiner
    overflow: "hidden", // Evita que o conteúdo extrapole
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  stepItem: {
    color: "#8a8a8a",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  list: {
    flexGrow: 0, // Evita que a lista cresça infinitamente
  },
  listContent: {
    paddingBottom: 10,
  },
});
