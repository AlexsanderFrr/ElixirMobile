import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { apiEndpoint } from "../../config/constantes";

export default function Header({ item, userToken, favoritos, setFavoritos }) {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [isFavorito, setIsFavorito] = React.useState(false);

  // Atualiza estado do ícone de favorito quando favoritos mudam
  React.useEffect(() => {
    const favorito = favoritos?.some(fav => fav.id === item.id);
    setIsFavorito(favorito);
  }, [favoritos, item.id]);

  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorito) {
        await fetch(`${apiEndpoint}/favoritos/delete/${item.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const updated = favoritos.filter(fav => fav.id !== item.id);
        setFavoritos(updated);
        setIsFavorito(false);
      } else {
        await fetch(`${apiEndpoint}/favoritos/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ id: item.id }),
        });
        setFavoritos([...favoritos, item]);
        setIsFavorito(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.header}>
      {/* Botão de voltar */}
      <View style={styles.iconButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={40} color="#BB5114" />
        </TouchableOpacity>
      </View>

      {/* Ícone de coração */}
      <View style={[styles.iconButton, styles.centerIcon]}>
        <TouchableOpacity onPress={toggleFavorite}>
          <FontAwesome name={isFavorito ? "heart" : "heart-o"} size={40} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 30,
    paddingHorizontal: 30,
    width: "100%",
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#BB5114',
  },
  centerIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
