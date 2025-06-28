// components/RecommendedSection.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiEndpoint } from '../../config/constantes';
import { FontAwesome } from '@expo/vector-icons';
import ProductCard from './ProductCard';

export default function RecommendedSection({ userToken, favoritos, setFavoritos }) {
  const navigation = useNavigation();
  const [juices, setJuices] = useState([]);
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchJuices = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/suco/all`);
        const data = await response.json();
        const validData = data
          .filter((juice) => juice.suco_id)
          .map((juice) => ({
            ...juice,
            id: juice.suco_id,
          }));
        setJuices(validData);
        setFilteredJuices(validData);
      } catch (error) {
        console.error('Erro ao buscar sucos: ', error);
      }
    };
    fetchJuices();
  }, []);

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
      </View>

      <View style={styles.filterContainer}>
        {['Todos'].map((category) => (
          <TouchableOpacity key={category} onPress={() => filterJuices(category)}>
            <View style={[
              styles.filterButttom,
              selectedCategory === category && styles.activeFilterBackground,
            ]}>
              <Text style={[
                styles.filter,
                selectedCategory === category && styles.activeFilterText,
              ]}>
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredJuices}
        keyExtractor={(item, index) => item.id?.toString() ?? `key-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.juiceButtonItemVertical}
            onPress={() => navigation.navigate('Exibicao', {
              item,                    // ✅ passa o objeto completo
              userToken,               // ✅ necessário para favoritos
              favoritos,
              setFavoritos
            })}
          >
            <ProductCard
              item={item}
              userToken={userToken}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum suco disponível no momento.</Text>}
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
    marginVertical: 20,
  },
  filterButttom: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
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
