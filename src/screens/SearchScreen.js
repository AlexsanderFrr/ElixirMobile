import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderBar from '../../components/Pesquisar/HeaderBar';
import SearchBar from '../../components/Pesquisar/SearchBar';
import SectionList from '../../components/Pesquisar/SectionList';

export default function SearchScreen() {
  const recentSearches = ['Suco de Pêssego', 'Vitamina de Banana', 'Sucos Medicinais'];
  const similarSearches = ['Sheiks', 'Sucos Emagrecimento'];

  const handleBackPress = () => {
    console.log('Voltar pressionado');
  };

  const handleRemoveRecent = (item) => {
    console.log(`Removido: ${item}`);
  };

  const handleSimilarSearch = (item) => {
    console.log(`Selecionado: ${item}`);
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Procurar" />
      <SearchBar placeholder="Abacaxi" />
      <SectionList
        title="Pesquisas Recentes"
        data={recentSearches}
        actionIcon="close"
        onActionPress={handleRemoveRecent}
      />
      <SectionList
        title="Pesquisas Semelhantes"
        data={similarSearches}
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
