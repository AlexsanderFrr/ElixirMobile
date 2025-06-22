// components/ResultList.js

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import ResultItem from './ResultItem';
import ProductCard from '../HomeScreen/ProductCard';

export default function ResultList({ items, userToken, favoritos, setFavoritos }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTitlePress = (item) => {
    setSelectedItem(item); // Define o item clicado
  };

  const handleArrowPress = () => {
    setSelectedItem(null); // Oculta o card se necessário
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {items.map((item) => (
        <View key={item.id}>
          <ResultItem
            title={item.nome}
            onTitlePress={() => handleTitlePress(item)}
            onArrowPress={handleArrowPress}
          />
          {selectedItem?.id === item.id && (
            <ProductCard
              item={item}
              userToken={userToken}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
              onRemoveFavorite={(id) =>
                setFavoritos((prev) => prev.filter((fav) => fav.id !== id))
              }
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}
