import React, { useState, useEffect } from 'react';
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
import { apiEndpoint } from '../../config/constantes';

let debounceTimer;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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
              <ResultItem
                title={title}
                onArrowPress={() => {
                  setSearchQuery(title);
                  setSearchSubmitted(true);
                  fetchResults(title);
                }}
                onTitlePress={() => {
                  setSearchQuery(title);
                  setSearchSubmitted(true);
                  fetchResults(title); // <-- Adicione esta chamada
                }}
              />
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
