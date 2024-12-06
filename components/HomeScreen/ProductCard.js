import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiEndpoint } from '../../config/constantes';

export default function ProductCard({ item, userToken }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        // Log para verificar o token recebido
        console.log('Token recebido:', userToken);
  
        const response = await fetch(`${apiEndpoint}/favoritos/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Erro do servidor:', errorResponse); // Log detalhado do erro
          throw new Error('Erro ao buscar favoritos');
        }
  
        const data = await response.json();
        const favoritos = data.map((fav) => fav.suco.id);
        setLiked(favoritos.includes(item.id));
      } catch (error) {
        console.error('Erro ao verificar favoritos:', error);
      }
    };
  
    checkIfLiked();
  }, [item.id, userToken]);

  const handleLikePress = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (liked) {
        const response = await fetch(`${apiEndpoint}/favoritos/delete/${item.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (!response.ok) {
          throw new Error('Erro ao remover dos favoritos');
        }

        setLiked(false);
        Alert.alert('Sucesso', 'Suco removido dos favoritos!');
      } else {
        const response = await fetch(`${apiEndpoint}/favoritos/add`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: item.id }),
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar aos favoritos');
        }

        setLiked(true);
        Alert.alert('Sucesso', 'Suco adicionado aos favoritos!');
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
          <Text style={styles.juiceNameVertical}>{item.nome}</Text>
        </View>
        <TouchableOpacity onPress={handleLikePress} style={styles.iconContainer}>
          <FontAwesome name={liked ? 'heart' : 'heart-o'} size={24} color="red" />
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
  },
  juiceNameVertical: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
