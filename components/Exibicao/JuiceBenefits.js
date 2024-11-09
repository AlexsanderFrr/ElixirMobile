import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JuiceBenefits({ benefits }) {
  return (
    <View style={styles.benefContainer}>
      <Text style={styles.titleBenefits}>Benefícios:</Text>
      <Text style={styles.benefitsInfo}>{benefits}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  benefContainer: {
    marginTop: 30,
  },
  titleBenefits: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  benefitsInfo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
