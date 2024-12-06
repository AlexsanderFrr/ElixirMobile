import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ placeholder, value, onChangeText, onSearch }) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color="#B85A25" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#838181"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => {
          onSearch();
          Keyboard.dismiss();
        }}
      />
      <TouchableOpacity onPress={onSearch}>
        <Ionicons name="mic-outline" size={24} color="#B85A25" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 15,
    elevation: 5,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2,
    borderColor: '#BB5104',
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
    fontWeight: '600',
  },
});
