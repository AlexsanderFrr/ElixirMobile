import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiEndpoint } from '../../config/constantes';

export default function ProductCard({ item, userToken, favoritos = [], setFavoritos, onRemoveFavorite }) {
  const [loading, setLoading] = useState(false);
  const isFavorito = favoritos.some(fav => fav.id === item.id);

  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorito) {
        // Remove dos favoritos
        await fetch(`${apiEndpoint}/favoritos/delete/${item.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        
        const updatedFavorites = favoritos.filter(fav => fav.id !== item.id);
        setFavoritos(updatedFavorites);
        
        if (onRemoveFavorite) {
          onRemoveFavorite(item.id);
        }
      } else {
        // Adiciona aos favoritos
        await fetch(`${apiEndpoint}/favoritos/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ id: item.id }),
        });
        
        setFavoritos([...favoritos, item]);
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.juiceItemVertical}>
        <Image source={{ uri: item.img1 }} style={styles.juiceImageVertical} />
        <View style={styles.juiceInfoVertical}>
          <Text
            style={styles.juiceNameVertical}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.nome || item.suco_nome}
          </Text>
          <Text
            style={styles.juiceDiagnosticoVertical}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.diagnostico_nome_da_condicao || 'Diagnóstico não disponível'}
          </Text>
          <Text
            style={styles.juiceCategoriaVertical}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.categoria_nome || 'Categoria não disponível'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={toggleFavorite} 
          style={styles.iconContainer}
          disabled={loading}
        >
          <FontAwesome 
            name={isFavorito ? 'heart' : 'heart-o'} 
            size={24} 
            color={isFavorito ? '#B85A25' : '#838181'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '99%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    height: 130,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  juiceItemVertical: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  juiceImageVertical: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#838181',
  },
  juiceInfoVertical: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  juiceNameVertical: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  juiceDiagnosticoVertical: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  juiceCategoriaVertical: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});