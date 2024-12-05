import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import api from '../../config/axiosConfig';
export default function ProductCard({ item, userToken }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await api.get('/favoritos/all', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const favoritos = response.data.map(fav => fav.suco.id);
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
        await api.delete(`/favoritos/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setLiked(false);
        Alert.alert('Sucesso', 'Suco removido dos favoritos!');
      } else {
        await api.post(
          '/favoritos/add',
          { id: item.id },
          { headers: { Authorization: `Bearer ${userToken}` } },
        );
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
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 }, // Eixo X e Y
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Sombra para Android
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
    flex: 1, // Faz o texto ocupar o espaço restante
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