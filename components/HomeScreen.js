import React from "react";
import { View, Image, TextInput, StyleSheet, ScrollView, FlatList, Text } from "react-native";

const HomeScreen = () => {
  // Dados de exemplo para os sucos
  const juices = [
    { id: 1, name: "Suco de Laranja", function: "Aumenta a imunidade", price: "R$ 5,00", image: require("../assets/garrafa-suco.png") },
    { id: 2, name: "Suco de Limão", function: "Ajuda na digestão", price: "R$ 4,00", image: require("../assets/garrafa-suco.png") },
    { id: 3, name: "Suco de Abacaxi", function: "Alivia dores musculares", price: "R$ 6,00", image: require("../assets/garrafa-suco.png") },
    { id: 4, name: "Suco de Melancia", function: "Refresca o corpo", price: "R$ 7,00", image: require("../assets/garrafa-suco.png") },
    { id: 5, name: "Suco de Morango", function: "Ajuda na circulação sanguínea", price: "R$ 8,00", image: require("../assets/garrafa-suco.png") },
    { id: 6, name: "Suco de Uva", function: "Rico em antioxidantes", price: "R$ 6,00", image: require("../assets/garrafa-suco.png") },
    { id: 7, name: "Suco de Açaí", function: "Energético natural", price: "R$ 10,00", image: require("../assets/garrafa-suco.png") },
    { id: 8, name: "Suco de Acerola", function: "Fortalece o sistema imunológico", price: "R$ 7,00", image: require("../assets/garrafa-suco.png") },
    { id: 9, name: "Suco de Cenoura", function: "Melhora a saúde da pele", price: "R$ 5,00", image: require("../assets/garrafa-suco.png") },
    { id: 10, name: "Suco de Mamão", function: "Auxilia na digestão", price: "R$ 5,00", image: require("../assets/garrafa-suco.png") },
  ];

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

      {/* ScrollView horizontal para as indicações de sucos */}
      <ScrollView horizontal style={styles.scrollView}>
        {juices.map((juice) => (
          <View key={juice.id} style={styles.juiceItemHorizontal}>
            <Image source={juice.image} style={styles.juiceImageHorizontal} resizeMode="contain" />
            <Text style={styles.juiceNameHorizontal}>{juice.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Linha separadora */}
      <View style={styles.separator} />
      <Text style={styles.catalogText}>Catálogo</Text>
      {/* FlatList para todos os sucos */}
      <FlatList
        data={juices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.juiceItemVertical}>
             
            <Image source={item.image} style={styles.juiceImageVertical} resizeMode="contain" />
            <View style={styles.juiceInfoVertical}>
              <Text style={styles.juiceNameVertical}>{item.name}</Text>
              <Text style={styles.juiceFunctionVertical}>{item.function}</Text>
              <Text style={styles.juicePriceVertical}>{item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
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
  scrollView: {
    marginTop: 10,
    marginBottom: 40,
  },
  juiceItemHorizontal: {
    alignItems: "center",
    marginRight: 30,
    marginBottom: 20, // Adicione margem inferior para separar os itens
    height: 160, // Defina uma altura para o container
  },
  juiceImageHorizontal: {
    width: 100,
    height: 100,
  },
  juiceNameHorizontal: {
    fontSize: 16,
    marginTop: 5, // Ajuste o marginTop para separar a imagem e o texto
    textAlign: "center", // Centraliza o texto
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#838181",
  },
  catalogText: {
    fontSize: 23,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 50,
    marginTop: 10,
  },
  juiceItemVertical: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#F4DEAA",
  },
  juiceImageVertical: {
    width: 120,
    height: 120,
    marginRight: 5,
  },
  juiceInfoVertical: {
    flex: 1,
    marginRight: 10,
  },
  juiceNameVertical: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  juiceFunctionVertical: {
    fontSize: 14,
  },
  juicePriceVertical: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
