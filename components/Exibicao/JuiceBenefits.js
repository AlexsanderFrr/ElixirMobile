import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function JuiceBenefits({ benefits }) {
  return (
    <View style={styles.container}>
      {/* Título fixo */}
      <Text style={styles.titleBenefits}>Benefícios:</Text>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.benefitsInfo}>{benefits}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  titleBenefits: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 15, // Evita que o conteúdo toque no final abruptamente
  },
  benefitsInfo: {
    color: "#8a8a8a",
    fontSize: 20,
    fontWeight: "600",
  },
});
