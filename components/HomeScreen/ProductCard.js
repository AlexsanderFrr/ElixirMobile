// components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductCard({ title, type, healthBenefit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.healthBenefit}>{healthBenefit}</Text>
      <FontAwesome name="heart-o" size={24} color="red" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '45%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#B85A25',
  },
  healthBenefit: {
    fontSize: 12,
    color: '#6e6e6e',
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
