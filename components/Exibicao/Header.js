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
      <View style={styles.iconButton}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={[styles.iconButton, styles.centerIcon]}>
        <TouchableOpacity 
          onPress={toggleFavorite}
          style={styles.button}
        >
          <FontAwesome 
            name={isFavorito ? "heart" : "heart-o"} 
            size={28} 
            color={isFavorito ? "#FF3A44" : "#FFFFFF"} 
          />
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
    paddingTop: 50,
    paddingHorizontal: 20,
    width: "100%",
    zIndex: 1,
  },
  iconButton: {
    backgroundColor: "rgba(187, 81, 20, 0.8)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});