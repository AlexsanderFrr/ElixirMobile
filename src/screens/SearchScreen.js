import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import ResultItem from '../../components/Pesquisar/ResultItem';
import EmptyResults from '../../components/Pesquisar/EmptyResults';
import ProductCard from '../../components/HomeScreen/ProductCard';

import { apiEndpoint } from '../../config/constantes';
import { AuthContext } from '../context/authContext';

let debounceTimer;

export default function SearchScreen({ favoritos = [], setFavoritos }) {
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchResults = async (query) => {
    if (!query || query.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const url = `${apiEndpoint}/suco/title/${encodeURIComponent(query)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se um item está nos favoritos
  const isFavorite = useCallback((itemId) => {
  return (favoritos || []).some(fav => fav.id === itemId);
}, [favoritos]);

  // Atualiza os favoritos quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      // Você pode adicionar aqui uma chamada para atualizar os favoritos se necessário
    }, [])
  );

  useEffect(() => {
    clearTimeout(debounceTimer);

    if (searchQuery.trim().length === 0) {
      setResults([]);
      setSearchSubmitted(false);
      return;
    }

    debounceTimer = setTimeout(() => {
      fetchResults(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleManualSearch = () => {
    if (searchQuery.trim().length > 0) {
      setSearchSubmitted(true);
      fetchResults(searchQuery);
    } else {
      setResults([]);
      setSearchSubmitted(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Procurar" />
      <SearchBar
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setSearchSubmitted(false);
          setSelectedItem(null);
        }}
        onSearch={handleManualSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
      ) : searchQuery.trim().length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={({ item }) => {
            const title = item.suco_nome || item.nome;

            if (searchSubmitted) {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('Exibicao', {
                    item,
                    userToken,
                    favoritos,
                    setFavoritos
                  })}
                >
                  <ProductCard
                    item={item}
                    userToken={userToken}
                    favoritos={favoritos}
                    setFavoritos={setFavoritos}
                    isFavorite={isFavorite(item.id)}
                    onToggleFavorite={() => {
                      // Esta função será tratada pelo ProductCard internamente
                    }}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <ResultItem
                  title={title}
                  onTitlePress={() => {
                    setSearchQuery(title);
                    setSearchSubmitted(true);
                  }}
                />
              );
            }
          }}
          ListEmptyComponent={
            searchSubmitted && results.length === 0 ? <EmptyResults /> : null
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DEAA',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  loader: {
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});