import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color="#B85A25" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        placeholderTextColor="#838181"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Elevação para Android
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#838181",
  },
});