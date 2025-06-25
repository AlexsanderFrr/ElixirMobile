import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function IngredientList({ ingredients }) {
  // Converte a string para array, caso seja necessário
  const formattedIngredients = Array.isArray(ingredients)
    ? ingredients
    : typeof ingredients === "string"
    ? ingredients.split(",").map((item) => item.trim())
    : [];

  // Verifica se há ingredientes disponíveis
  if (!formattedIngredients || formattedIngredients.length === 0) {
    return <Text style={styles.emptyText}>Nenhum ingrediente disponível</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes:</Text>
      <FlatList
        data={formattedIngredients}
        keyExtractor={(item, index) => index.toString()} // Evitar conflitos de key
        renderItem={({ item }) => (
          <Text style={styles.ingredientItem}>{item}</Text>
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
    overflow: "hidden", // Evita que o conteúdo extrapole
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: "uppercase",
    marginBottom: 10,
  },
  ingredientItem: {
    color: "#DC9B00",
    fontSize: 20,
    fontWeight: '600',
    // marginVertical: 5,
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

  },
});
