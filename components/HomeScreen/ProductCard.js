import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductCard({ item }) {
  const [liked, setLiked] = useState(false); // Estado para controlar o botão de curtir

  const handleLikePress = () => {
    setLiked(!liked); // Alterna o estado de curtir
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
            name={liked ? "heart" : "heart-o"} // Ícone alternado
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
    width: "99%",
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
    borderColor: "#838181",
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
    //padding: 10, // Facilita o toque
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
