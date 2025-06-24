// components/Categories.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Categories() {
  const categories = ['Detox', 'Medicinal', 'Vitamina'];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Categorias</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={() => {/* Função para abrir as categorias */ }}>
          <Text style={styles.viewAll}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryButtonsContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryItem}>
            <TouchableOpacity style={styles.categoryButton} onPress={() => {/* Função para filtrar por categoria */ }}>
            </TouchableOpacity>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAll: {
    fontSize: 14,
    color: '#B85A25',
    fontWeight: 'bold',
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center', // Alinha o ícone e o texto no centro
    flexDirection: 'column',
  },
  categoryButton: {
    backgroundColor: '#fff', // Fundo laranja para o botão
    borderRadius: 10,
    height: 80,
    width: 100,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 }, // Eixo X e Y
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Sombra para Android
    elevation: 8,
  },
  categoryButtonText: {
    fontWeight: 'bold',
    marginTop: 10, // Espaço entre o botão e o texto
  },
});