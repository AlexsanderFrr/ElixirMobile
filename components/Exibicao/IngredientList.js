import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function IngredientList() {
  return (
    <View style={styles.itensContainer}>
      <Text style={styles.titleIngredient}>Ingredientes:</Text>
      <View style={styles.ingredient}>
        <Image source={require("../../assets/agua.png")} style={styles.ingredientImage} />
        <Image source={require("../../assets/cenoura.png")} style={styles.ingredientImage} />
        <Image source={require("../../assets/limao.png")} style={styles.ingredientImage} />
        <Image source={require("../../assets/gengibre.png")} style={styles.ingredientImage} />
        <Image source={require("../../assets/mel.png")} style={styles.ingredientImage} />
      </View>
      <View style={styles.ingredientName}>
        <Text style={styles.ingredientText}>Água</Text>
        <Text style={styles.ingredientText}>Cenoura</Text>
        <Text style={styles.ingredientText}>Limão</Text>
        <Text style={styles.ingredientText}>Gengibre</Text>
        <Text style={styles.ingredientText}>Mel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itensContainer: {
    marginTop: 30,
  },
  titleIngredient: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  ingredient: {
    flexDirection: "row",
    marginBottom: 5,
  },
  ingredientImage: {
    marginRight: 30,
  },
  ingredientName: {
    flexDirection: "row",
  },
  ingredientText: {
    color: "#8a8a8a",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 24,
  },
});
