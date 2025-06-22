import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import ResultItem from '../../components/Pesquisar/ResultItem';
import EmptyResults from '../../components/Pesquisar/EmptyResults';
import ProductCard from '../../components/HomeScreen/ProductCard';

import { apiEndpoint } from '../../config/constantes';
import { AuthContext } from '../context/authContext';

let debounceTimer;

export default function SearchScreen({ favoritos, setFavoritos }) {
  const { userToken } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Novo estado

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
          setSelectedItem(null); // limpa o card ao digitar novamente
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

            return (
              <View key={item.id}>
                <ResultItem
                  title={title}
                  onArrowPress={() => setSelectedItem(null)}
                  onTitlePress={() => {
                    setSearchQuery(title);
                    setSearchSubmitted(true);
                    setSelectedItem(item);
                  }}
                />
                {searchSubmitted && selectedItem?.id === item.id && (
                  <ProductCard
                    item={item}
                    userToken={userToken}
                    favoritos={favoritos}
                    setFavoritos={setFavoritos}
                    onRemoveFavorite={() => { }}
                  />
                )}
              </View>
            );
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
    paddingVertical: 30,
  },
  loader: {
    marginTop: 20,
  },
});
