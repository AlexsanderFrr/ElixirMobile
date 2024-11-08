// components/RecommendedSection.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiEndpoint } from '../../config/constantes';
import ProductCard from './ProductCard'; // Importação do ProductCard

export default function RecommendedSection() {
  const navigation = useNavigation();
  const [juices, setJuices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredJuices, setFilteredJuices] = useState([]);

  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const url = searchText
          ? `${apiEndpoint}/suco/search/${searchText}`
          : `${apiEndpoint}/suco/all`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data fetched: ', data);
        setJuices(data);
        setFilteredJuices(data);
      } catch (error) {
        console.error('Erro ao buscar sucos: ', error);
      }
    };
    fetchJuices();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendado Para Você</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filter}>Todos</Text>
        <Text style={styles.filter}>Detox</Text>
        <Text style={styles.filter}>Medicinal</Text>
      </View>
      <FlatList
        data={filteredJuices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.juiceButtonItemVertical}
            onPress={() => navigation.navigate('Exibicao', {
              name: item.nome,
              function: item.beneficios,
              image: item.img1,
            })}
          >
            <ProductCard item={item} /> {/* Uso do ProductCard no FlatList */}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  filter: {
    fontWeight: 'bold',
    color: '#B85A25',
  },
  juiceButtonItemVertical: {
    marginBottom: 20,
    //flexDirection: 'row',
  },
  flatListContainer: {
    paddingBottom: 40,
  },
});
