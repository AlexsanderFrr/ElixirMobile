import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../../config/constantes';

import Header from '../../components/HomeScreen/Header';
import Categories from '../../components/HomeScreen/Categories';
import RecommendedSection from '../../components/HomeScreen/RecommendedSection';

export default function HomeScreen() {
  const [userToken, setUserToken] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };
    fetchToken();
  }, []);

  const fetchFavoritos = useCallback(async () => {
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
  }, [userToken]);

  useEffect(() => {
    if (userToken) fetchFavoritos();
  }, [userToken, fetchFavoritos]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Categories />
      {userToken && (
        <RecommendedSection
          userToken={userToken}
          favoritos={favoritos}
          setFavoritos={setFavoritos}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
  },
});
