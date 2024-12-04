import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function IngredientList({ ingredients }) {
  // Verifica se há ingredientes e formata adequadamente
  if (!ingredients || ingredients.length === 0) {
    return <Text style={styles.emptyText}>Nenhum ingrediente disponível</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes:</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()} // Evitar conflitos de key
        renderItem={({ item }) => (
          <Text style={styles.ingredientItem}>- {item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  ingredientItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});