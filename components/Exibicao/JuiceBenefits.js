import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-web";

export default function JuiceBenefits({ benefits }) {
  return (
    <ScrollView>
      <View style={styles.benefContainer}>
        <Text style={styles.titleBenefits}>Benefícios:</Text>
        <Text style={styles.benefitsInfo}>{benefits}</Text>
      </View>
    </ScrollView>
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
    color: "#8a8a8a",
    fontSize: 20,
    fontWeight: "600",
  },
});
