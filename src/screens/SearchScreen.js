import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Erro', 'Digite algo para pesquisar.');
      return;
    }

    /*setLoading(true);
    try {
      const response = await fetch(`http://seu-backend-url.com/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data = await response.json();
      setResults(data.results || []); // Supondo que os resultados vêm em `data.results`
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados.');
    } finally {
      setLoading(false);
    }*/
  }

  return (
    <View style={styles.container}>
      <HeaderBar title="Procurar" />
      <SearchBar
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#B85A25" style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.resultItem}>{item.name}</Text>} // Supondo que o item tem um campo `name`
          ListEmptyComponent={<Text style={styles.emptyMessage}>Não foi encontrado nenhum item relacionado a sua pesquisa. Tente novamente!</Text>}
        />
      )}
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
  resultItem: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
    color: '#000',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#838181',
  },
});
