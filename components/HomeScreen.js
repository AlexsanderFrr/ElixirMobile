import React from "react";
import { View, Image, TextInput, StyleSheet, ScrollView, FlatList, Text } from "react-native";

const HomeScreen = () => {
  // Dados de exemplo para as listas
  const juices = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Suco ${index + 1}`,
    image: require("../assets/garrafa-suco.png"),
  }));

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
          <View key={juice.id} style={styles.item}>
            <Image source={juice.image} style={styles.juiceImage} resizeMode="contain" />
            <Text style={styles.juiceName}>{juice.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Linha separadora */}
      <View style={styles.separator} />

      {/* FlatList para todos os sucos */}
      <FlatList
        data={juices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.juiceImage} resizeMode="contain" />
            <Text style={styles.juiceName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
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
    marginBottom: 10,
    height: 400,
  },
  item: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150, // Aumentei a altura para melhor exibir as imagens
  },
  juiceImage: {
    width: 100,
    height: 100,
  },
  juiceName: {
    marginTop: 5,
    fontSize: 16,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCCCCC",
  },
});

export default HomeScreen;
