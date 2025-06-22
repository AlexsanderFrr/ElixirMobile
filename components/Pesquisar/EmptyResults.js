import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EmptyResults() {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../assets/Discovery-cuate.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>Não Encontrado!</Text>
      <Text style={styles.emptyMessage}>
        Não foi encontrado nenhum item relacionado à sua pesquisa. Tente novamente!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyImage: {
    marginBottom: 20,
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#838181',
    fontSize: 18,
  },
  emptyTitle: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
