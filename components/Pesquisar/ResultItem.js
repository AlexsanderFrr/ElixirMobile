import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ResultItem({ title, onArrowPress, onTitlePress }) {
  return (
    <View style={styles.resultItem}>
      {/* Área clicável para o título e ícone */}
      <TouchableOpacity onPress={onTitlePress} style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="clock-check-outline"
          size={22}
          color="#B85A25"
        />
        <Text style={styles.resultText}>{title}</Text>
      </TouchableOpacity>

      {/* Botão da seta ao final do item */}
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
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    marginLeft: 5
  },
  resultText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
    flexShrink: 1,
  },
  iconRightContainer: {
    paddingHorizontal: 5,
  },
});
