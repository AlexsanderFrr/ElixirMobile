import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiEndpoint } from '../../config/constantes';
import axios from 'axios'; // Certifique-se de ter instalado axios

export default function ProductCard({ item, userToken }) {
  const [liked, setLiked] = useState(false); // Estado para controle da curtida
  const [loading, setLoading] = useState(false); // Estado para controle de requisições

  useEffect(() => {
    // Verifica se o suco está nos favoritos do usuário ao carregar o componente
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/favoritos/all'`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const favoritos = response.data.map(fav => fav.suco.id);
        setLiked(favoritos.includes(item.id)); // Define o estado inicial
      } catch (error) {
        console.error('Erro ao verificar favoritos:', error);
      }
    };

    checkIfLiked();
  }, [item.id, userToken]);

  const handleLikePress = async () => {
    if (loading) return; // Impede múltiplos cliques
    setLoading(true);

    try {
      if (liked) {
        // Remove dos favoritos
        await axios.delete(`/favoritos/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setLiked(false);
        Alert.alert('Sucesso', 'Suco removido dos favoritos!');
      } else {
        // Adiciona aos favoritos
        await axios.post(
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

  const getImageUrl = (imgPath) => `${imgPath}`;

  return (
    <View style={styles.card}>
      <View style={styles.juiceItemVertical}>
        <Image
          source={{ uri: getImageUrl(item.img1) }}
          style={styles.juiceImageVertical}
          resizeMode="cover"
        />
        <View style={styles.juiceInfoVertical}>
          <Text style={styles.juiceNameVertical}>{item.nome}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLikePress}
          style={styles.iconContainer} // Estilo para o botão de curtir
        >
          <FontAwesome
            name={liked ? 'heart' : 'heart-o'} // Ícone alternado
            size={24}
            color="red"
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