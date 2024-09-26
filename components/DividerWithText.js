import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Ou</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#838181', // cor cinza clara
  },
  text: {
    marginHorizontal: 10,
    fontWeight: '500', // corrigido para string
    fontSize: 20,
    color: '#838181', // cor cinza clara para o texto
  },
});

export default DividerWithText;