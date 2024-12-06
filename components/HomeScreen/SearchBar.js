import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => navigation.navigate('SearchScreen')} // Navega para a tela de pesquisa
    >
      <Ionicons name="search" size={24} color="#B85A25" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        placeholderTextColor="#838181"
        editable={false} // Torna o campo não editável
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#838181',
    fontWeight: '600',
  },
});
