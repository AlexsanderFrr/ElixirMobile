// screens/CategoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { apiEndpoint } from '../../config/constantes';
import ProductCard from '../../components/HomeScreen/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchTokenAndProducts = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      
      try {
        // Usando o endpoint de filtro do sucoController
        const response = await fetch(`${apiEndpoint}/sucos/filter?categoria=${encodeURIComponent(categoryName)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndProducts();
  }, [categoryName]);

  const fetchFavoritos = async () => {
    if (!userToken) return;
    try {
      const response = await fetch(`${apiEndpoint}/favoritos/all`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      const sucos = Array.isArray(data)
        ? data.map((fav) => fav.suco).filter(Boolean)
        : [];
      setFavoritos(sucos);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchFavoritos();
    }
  }, [userToken]);

  useEffect(() => {
    navigation.setOptions({ title: categoryName });
  }, [categoryName, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B85A25" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {products.length > 0 ? (
        products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <ProductCard
              item={product}
              userToken={userToken}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noProductsText}>Nenhum produto encontrado nesta categoria.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4DEAA',
  },
  productContainer: {
    marginBottom: 15,
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});