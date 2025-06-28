import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

const Header = ({ onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Ionicons name="arrow-back" size={40} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>ChatBot Assistente</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Header;