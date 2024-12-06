// components/RecommendedSection.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiEndpoint } from '../../config/constantes';
import { FontAwesome } from '@expo/vector-icons';
import ProductCard from './ProductCard'; // Importação do ProductCard
import PreparationMethod from '../Exibicao/PreparationMethod';

export default function RecommendedSection() {
  const navigation = useNavigation();
  const [juices, setJuices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos'); // Estado para armazenar a categoria selecionada

  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const url = searchText
          ? `${apiEndpoint}/suco/search/${searchText}`
          : `${apiEndpoint}/suco/all`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data fetched: ', data);
        // Filtrar itens inválidos
        const validData = data.filter((juice) => juice.suco_id); // Certifique-se de que cada item tenha um ID
        console.log('DataInvalid fetched: ', validData);

        setJuices(validData);
        setFilteredJuices(validData);
      } catch (error) {
        console.error('Erro ao buscar sucos: ', error);
      }
    };
    fetchJuices();
  }, [searchText]);

  const filterJuices = (category) => {
    setSelectedCategory(category);

    if (category === 'Todos') {
      setFilteredJuices(juices);
    } else {
      const filtered = juices.filter((juice) => juice.categoria === category);
      setFilteredJuices(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recomendado Para Você</Text>
        <TouchableOpacity style={styles.filterIcon} onPress={() => {/* Função para abrir o filtro */ }}>
          <FontAwesome name="filter" size={24} color="#BB5104" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['Todos', 'Detox', 'Medicinal'].map((category) => (
          <TouchableOpacity key={category} onPress={() => filterJuices(category)}>
            <View style={[
              styles.filterButttom,
              selectedCategory === category && styles.activeFilterBackground, // Aplicação do background ao contêiner
            ]}>
              <Text style={[
                styles.filter,
                selectedCategory === category && styles.activeFilterText, // Altera a cor do texto da categoria selecionada
              ]}>
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredJuices}
        keyExtractor={(item, index) => (item.suco_id ? item.suco_id.toString() : `key-${index}`)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.juiceButtonItemVertical}
            onPress={() => navigation.navigate('Exibicao', {
              nome: item.suco_nome,
              benefits: item.beneficios,
              image: item.img1,
              ingredients: item.ingredientes,
              preparationSteps: item.modo_de_preparo,
            })}
          >
            <ProductCard item={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum suco disponível no momento.</Text>} // Mensagem caso não haja dados
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterIcon: {
    padding: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  filterButttom: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  filter: {
    fontWeight: 'bold',
  },
  activeFilterBackground: {
    backgroundColor: '#BB5104', // Fundo para o botão selecionado
  },
  activeFilterText: {
    color: '#FFFFFF', // Cor do texto para o botão selecionado
  },
  juiceButtonItemVertical: {
    marginBottom: 20,
  },
  flatListContainer: {
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
