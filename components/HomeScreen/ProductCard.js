import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiEndpoint } from '../../config/constantes';

export default function ProductCard({ item, userToken, screen, onRemoveFavorite }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log('🔍 item recebido no ProductCard:', item);
  //console.log('item.id:', item.id, 'item.suco_id:', item.suco_id);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        console.log('Token enviado:', userToken); // Log para verificar o token

        const response = await fetch(`${apiEndpoint}/favoritos/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
          },
        });

        if (response.status === 403) {
          console.error('Erro 403: Acesso negado');
          throw new Error('Acesso negado. Verifique seu token de autenticação.');
        }

        if (!response.ok) {
          throw new Error(`Erro do servidor: ${response.statusText}`);
        }

        const data = await response.json();
        const favoritos = data.map((fav) => fav.suco.id);
        setLiked(favoritos.includes(item.id));
      } catch (error) {
        console.error('Erro ao verificar favoritos:', error.message); // Mostra mensagem detalhada
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

        if (onRemoveFavorite) {
          onRemoveFavorite(item.id);
        }

      } else {
        console.log('API Endpoint:', apiEndpoint);
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
          <Text
            style={styles.juiceNameVertical}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {screen == "favoritos" ? item.nome : item.suco_nome}
          </Text>
          <Text
            style={styles.juiceDiagnosticoVertical}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.diagnostico_nome_da_condicao || 'Diagnóstico não disponível'}
          </Text>
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
    justifyContent: 'center',
  },
  juiceNameVertical: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    flexWrap: 'wrap', // Permitir quebra de linha
  },
  juiceDiagnosticoVertical: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap', // Permitir quebra de linha
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});