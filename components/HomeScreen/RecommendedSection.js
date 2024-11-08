// components/RecommendedSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

export default function RecommendedSection() {
  const products = [
    { title: 'Suco', type: 'Medicinal', healthBenefit: 'Diabetes' },
    { title: 'Vitamina', type: 'Detox', healthBenefit: 'Emagrecimento' },
    { title: 'Chá', type: 'Controla', healthBenefit: 'Sono' },
    { title: 'Sheik', type: 'Rico em', healthBenefit: 'Saboroso' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendado Para Você</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filter}>Todos</Text>
        <Text style={styles.filter}>Detox</Text>
        <Text style={styles.filter}>Medicinal</Text>
      </View>
      <View style={styles.productList}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            type={product.type}
            healthBenefit={product.healthBenefit}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filter: {
    fontWeight: 'bold',
    color: '#B85A25',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
