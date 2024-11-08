// components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductCard({ item }) {
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
          {/*<Text style={styles.juiceFunctionVertical}>{item.beneficios}</Text>*/}
        </View>
        <FontAwesome name="heart-o" size={24} color="red" style={styles.icon} />
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
    borderColor: "#838181"
  },
  
  juiceInfoVertical: {
    marginLeft: 15,
  },
  juiceNameVertical: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  juiceFunctionVertical: {
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
