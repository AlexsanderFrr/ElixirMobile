import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import SectionList from '../../components/Pesquisar/SectionList';

export default function SearchScreen() {
  const [recentSearches, setRecentSearches] = useState(['Suco de Pêssego']);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    if (query.trim() === '') {
      Alert.alert('Erro', 'A pesquisa não pode estar vazia!');
      return;
    }
    setRecentSearches((prev) => [query, ...prev.filter((item) => item !== query)]);
    setSearchQuery('');
  };

  const handleRemoveRecent = (item) => {
    setRecentSearches((prev) => prev.filter((search) => search !== item));
  };

  const handleSimilarSearch = (item) => {
    Alert.alert('Pesquisa Semelhante Selecionada', `Você escolheu: ${item}`);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Procurar" />
      <SearchBar
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={() => handleSearch(searchQuery)}
      />
      <SectionList
        title="Pesquisas Recentes"
        data={recentSearches}
        actionIcon="close"
        onActionPress={handleRemoveRecent}
      />
      <SectionList
        title="Pesquisas Semelhantes"
        data={['Sheiks', 'Sucos Emagrecimento']}
        actionIcon="arrow-forward-outline"
        onActionPress={handleSimilarSearch}
      />
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
});
