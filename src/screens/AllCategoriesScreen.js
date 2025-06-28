// screens/AllCategoriesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiEndpoint } from '../../config/constantes';

export default function AllCategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Primeiro busca todos os sucos para extrair as categorias
        const response = await fetch(`${apiEndpoint}/sucos/all`);
        const sucos = await response.json();
        
        // Extrai categorias únicas dos sucos
        const uniqueCategories = [...new Set(sucos.map(suco => suco.categoria_nome))].filter(Boolean);
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B85A25" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Todas as Categorias</Text>
      {categories.length > 0 ? (
        categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('CategoryScreen', { categoryName: category })}
          >
            <View style={styles.categoryContent}>
              <FontAwesome 
                name={getIconForCategory(category)} 
                size={24} 
                color="#B85A25" 
              />
              <Text style={styles.categoryName}>{category}</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#B85A25" />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noCategoriesText}>Nenhuma categoria encontrada.</Text>
      )}
    </ScrollView>
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
    flex: 1,
    backgroundColor: '#F4DEAA',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCategoriesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4DEAA',
  },
});