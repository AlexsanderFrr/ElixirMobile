// context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import { apiEndpoint } from '../../config/constantes';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children, userToken }) {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/favoritos/all`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      const data = await response.json();
      setFavorites(data.map((fav) => fav.suco));
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
    }
  };

  useEffect(() => {
    if (userToken) fetchFavorites();
  }, [userToken]);

  const addFavorite = (juice) => {
    setFavorites((prev) => [...prev, juice]);
  };

  const removeFavorite = (juiceId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== juiceId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, fetchFavorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
