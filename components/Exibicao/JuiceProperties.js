import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JuiceProperties({ name }) {
  return (
    <View>
      <Text style={styles.nameJuice}>{name}</Text>
      <View style={styles.propertyJuice}>
        <Text style={styles.textProperty}>Imunidade</Text>
        <Text style={styles.textProperty}>Detox</Text>
        <Text style={styles.textProperty}>Frutas & Verduras</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameJuice: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
  },
  propertyJuice: {
    flexDirection: "row",
  },
  textProperty: {
    color: "#BB5114",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 15,
  },
});
