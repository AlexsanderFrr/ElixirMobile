// components/Categories.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Categories() {
  const categories = ['Detox', 'Medicinal', 'Vitamina'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <Text style={styles.viewAll}>Ver Tudo</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  category: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Adiciona sombra
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#B85A25',
    marginTop: 10,
    textAlign: 'center',
  },
  viewAll: {
    right: 0,
    fontSize: 14,
    color: '#B85A25',
    fontWeight: 'bold',
    marginTop: 5,
  },
  highlightedCategory: {
    borderColor: '#00F', // Borda azul para destaque
    borderWidth: 1,
  },
});
