import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

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
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={40} color="red" />
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
    justifyContent: "center", // Alinha verticalmente
    alignItems: "center", // Alinha horizontalmente
  },
});
