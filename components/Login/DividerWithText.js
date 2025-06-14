// DividerWithText.js
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
    width: '90%', // Garante que o contêiner ocupe toda a largura disponível
  },
  line: {
    height: 0.5,
    flex: 1, // Permite que as linhas cresçam proporcionalmente
    backgroundColor: "#838181",
  },
  text: {
    marginHorizontal: 30,
    fontWeight: '500',
    fontSize: 20,
    color: '#838181',
  },
});

export default DividerWithText;