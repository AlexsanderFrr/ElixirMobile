import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IngredientList({ ingredients }) {
  const formattedIngredients = Array.isArray(ingredients)
    ? ingredients
    : typeof ingredients === "string"
      ? ingredients.split(",").map((item) => item.trim())
      : [];

  if (!formattedIngredients || formattedIngredients.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum ingrediente disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes</Text>
      <View style={styles.list}>
        {formattedIngredients.map((item, index) => (
          <View key={index} style={styles.ingredientContainer}>
            <View style={styles.bulletPoint} />
            <Text style={styles.ingredientItem}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#BB5114',
    marginBottom: 15,
    fontFamily: 'sans-serif-condensed',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC9B00',
    marginRight: 12,
  },
  ingredientItem: {
    color: "#5A3800",
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    lineHeight: 24,
  },
  emptyContainer: {
    backgroundColor: '#FFF9F0',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#BB5114",
    textAlign: 'center',
    fontStyle: 'italic',
  },
  list: {
    backgroundColor: '#FFF9F0',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});