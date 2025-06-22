import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultItem({ title }) {
  return (
    <View style={styles.resultItem}>
      <Ionicons name="timer-outline" size={22} color="#B85A25" style={styles.icon} />
      <Text style={styles.resultText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
  },
  resultItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  resultText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
