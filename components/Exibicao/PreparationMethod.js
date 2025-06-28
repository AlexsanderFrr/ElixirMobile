import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PreparationMethod({ preparationSteps }) {
  const formattedSteps = Array.isArray(preparationSteps)
    ? preparationSteps
    : typeof preparationSteps === "string"
      ? preparationSteps.split(",").map((step) => step.trim())
      : [];

  if (!formattedSteps || formattedSteps.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum modo de preparo disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo de Preparo</Text>
      <View style={styles.list}>
        {formattedSteps.map((item, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepItem}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 15,
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    backgroundColor: '#BB5114',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 3,
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepItem: {
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