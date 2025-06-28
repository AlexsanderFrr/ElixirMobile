import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function JuiceBenefits({ benefits }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleBenefits}>Benefícios</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsInfo}>{benefits}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  titleBenefits: {
    fontSize: 24,
    fontWeight: '700',
    color: '#BB5114',
    marginBottom: 15,
    fontFamily: 'sans-serif-condensed',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  benefitsContainer: {
    backgroundColor: '#FFF9F0',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsInfo: {
    color: "#5A3800",
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
});