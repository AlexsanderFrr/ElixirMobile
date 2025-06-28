// components/Categories.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
  const navigation = useNavigation();
  const categories = ['Suco', 'Sheik'];

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryScreen', { categoryName: category });
  };

  const handleViewAllPress = () => {
    navigation.navigate('AllCategoriesScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Categorias</Text>
      </View>

      <View style={styles.categoryButtonsContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryItem}>
            <TouchableOpacity 
              style={styles.categoryButton} 
              onPress={() => handleCategoryPress(category)}
            >
              <FontAwesome 
                name={getIconForCategory(category)} 
                size={30} 
                color="#B85A25" 
                style={{ alignSelf: 'center', marginTop: 25 }}
              />
            </TouchableOpacity>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function getIconForCategory(category) {
  switch(category) {
    case 'Suco':
      return 'glass';
    case 'Sheik':
      return 'shopping-basket';
    case 'Smoothie':
      return 'blender';
    default:
      return 'lemon-o';
  }
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