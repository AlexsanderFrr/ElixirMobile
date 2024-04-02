import React from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-branco.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Pesquisar..."
            placeholderTextColor="#838181"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Isso faz com que o componente ocupe toda a tela
    backgroundColor: "#F4DEAA",
  },
  header: {
    backgroundColor: "#BB5104",
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 180,
    height: 30,
    marginLeft: -150,
  },
  searchContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 40,
    color: "#838181",
  },
});

export default HomeScreen;
