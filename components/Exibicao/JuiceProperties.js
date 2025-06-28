import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JuiceProperties({ name, category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameJuice}>{name}</Text>
      <View style={styles.propertyJuice}>
        <View style={styles.propertyTag}>
          <Text style={styles.textProperty}>{category}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nameJuice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#BB5114',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  propertyJuice: {
    flexDirection: "row",
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  propertyTag: {
    backgroundColor: "#FFE8C8",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DC9B00',
  },
  textProperty: {
    color: "#BB5114",
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});