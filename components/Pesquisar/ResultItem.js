import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Nova biblioteca

export default function ResultItem({ title, onArrowPress }) {
  return (
    <View style={styles.resultItem}>
      <MaterialCommunityIcons name="clock-check-outline" size={22} color="#B85A25" style={styles.iconLeft} />
      <Text style={styles.resultText}>{title}</Text>

      <TouchableOpacity onPress={onArrowPress} style={styles.iconRightContainer}>
        <MaterialCommunityIcons name="arrow-top-left" size={22} color="#B85A25" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  iconLeft: {
    marginLeft: 5,
  },
  resultText: {
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  iconRightContainer: {
    paddingHorizontal: 5,
  },
});
