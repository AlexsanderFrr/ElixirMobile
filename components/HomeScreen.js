import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState("Recomendado");
  const [searchText, setSearchText] = useState("");
  const [filteredJuices, setFilteredJuices] = useState([]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSearchText(""); // Limpa o texto da pesquisa quando uma categoria é selecionada
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Filtra os sucos com base no texto de pesquisa
    const filtered = juices.filter((juice) =>
      juice.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredJuices(filtered);
  };

  // Dados de exemplo para os sucos
  const juices = [
    {
      id: 1,
      name: "Suco de Laranja",
      function: "Aumenta a imunidade",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 2,
      name: "Suco de Limão",
      function: "Ajuda na digestão",
      price: "R$ 4,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 3,
      name: "Suco de Abacaxi",
      function: "Alivia dores musculares",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 4,
      name: "Suco de Melancia",
      function: "Refresca o corpo",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 5,
      name: "Suco de Morango",
      function: "Ajuda na circulação sanguínea",
      price: "R$ 8,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 6,
      name: "Suco de Uva",
      function: "Rico em antioxidantes",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 7,
      name: "Suco de Açaí",
      function: "Energético natural",
      price: "R$ 10,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 8,
      name: "Suco de Acerola",
      function: "Fortalece o sistema imunológico",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 9,
      name: "Suco de Cenoura",
      function: "Melhora a saúde da pele",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 10,
      name: "Suco de Mamão",
      function: "Auxilia na digestão",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 11,
      name: "Suco de Aloe Vera",
      function: "Promove a saúde digestiva",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 12,
      name: "Suco de Gengibre",
      function: "Alivia náuseas e dores de cabeça",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 13,
      name: "Suco de Espinafre",
      function: "Fonte de ferro e antioxidantes",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 14,
      name: "Suco de Cenoura e Beterraba",
      function: "Detox e fortalecimento imunológico",
      price: "R$ 8,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 15,
      name: "Suco de Maçã Verde",
      function: "Ajuda na desintoxicação do fígado",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 16,
      name: "Suco de Couve",
      function: "Rico em nutrientes e antioxidantes",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 17,
      name: "Suco de Cranberry",
      function: "Previne infecções do trato urinário",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 18,
      name: "Suco de Chá Verde",
      function: "Estimula o metabolismo",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 19,
      name: "Suco de Pepino",
      function: "Hidratação e redução da pressão arterial",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 20,
      name: "Suco de Limão Siciliano",
      function: "Alcaliniza o corpo e aumenta a imunidade",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 21,
      name: "Suco de Morango com Hortelã",
      function: "Refrescante e rico em vitamina C",
      price: "R$ 8,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 22,
      name: "Suco de Pera com Canela",
      function: "Digestivo e anti-inflamatório",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 23,
      name: "Suco de Manga",
      function: "Rico em vitamina A e antioxidantes",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 24,
      name: "Suco de Caju",
      function: "Fortalece o sistema imunológico",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 25,
      name: "Suco de Maracujá",
      function: "Calma e relaxa o corpo",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 26,
      name: "Suco de Melão",
      function: "Hidratação e regulação da pressão arterial",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco5.png"),
    },
    {
      id: 27,
      name: "Suco de Framboesa",
      function: "Fonte de fibras e antioxidantes",
      price: "R$ 7,00",
      image: require("../assets/garrafa-suco.png"),
    },
    {
      id: 28,
      name: "Suco de Kiwi",
      function: "Fortalece o sistema imunológico",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco2.png"),
    },
    {
      id: 29,
      name: "Suco de Pêssego",
      function: "Promove a saúde da pele",
      price: "R$ 5,00",
      image: require("../assets/garrafa-suco4.png"),
    },
    {
      id: 30,
      name: "Suco de Beterraba",
      function: "Aumenta a resistência física e combate a anemia",
      price: "R$ 6,00",
      image: require("../assets/garrafa-suco5.png"),
    },
  ];

  // Filtra os sucos com base na categoria selecionada
  const filteredCategoryJuices = () => {
    switch (selectedCategory) {
      case "Recomendado":
        return juices.slice(0, 10);
      case "Detox":
        return juices.slice(10, 20);
      case "Medicinal":
        return juices.slice(20, 30);
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#BB5104" />
      <View style={styles.header}>
        <View style={styles.firstGroup}>
          <Image
            source={require("../assets/logo-branco.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Ionicons name="chatbubble-ellipses-outline" size={30} color={"#fff"}></Ionicons>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍   Pesquisar..."
            placeholderTextColor="#838181"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View>
      {/* Barra de navegação */}
      <View style={styles.navigationBar}>
        {["Recomendado", "Detox", "Medicinal"].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategoryItem,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Renderiza o ScrollView horizontal somente se não houver texto de pesquisa */}
      {!searchText && (
        <ScrollView horizontal style={styles.scrollView}>
          {filteredCategoryJuices().map((juice) => (
            <View key={juice.id} style={styles.juiceItemHorizontal}>
              <Image
                source={juice.image}
                style={styles.juiceImageHorizontal}
                resizeMode="contain"
              />
              <Text style={styles.juiceNameHorizontal}>{juice.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      </View>
      
      {/* Linha separadora */}
      <View style={styles.separator} />
      <Text style={styles.catalogText}>Catálogo</Text>

      {/* FlatList para todos os sucos ou sucos filtrados */}
      <FlatList
        data={searchText === "" ? juices : filteredJuices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.juiceItemVertical}
            onPress={() => navigation.navigate("Exibicao", { name: item.name, function: item.function, image: item.image })}

          >
            <View style={styles.juiceItemVertical}>
              <Image
                source={item.image}
                style={styles.juiceImageVertical}
                resizeMode="contain"
              />
              <View style={styles.juiceInfoVertical}>
                <Text style={styles.juiceNameVertical}>{item.name}</Text>
                <Text style={styles.juiceFunctionVertical}>
                  {item.function}
                </Text>
                <Text style={styles.juicePriceVertical}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DEAA",
  },
  header: {
    height: "20%",
    backgroundColor: "#BB5104",
    //paddingVertical: 30,
    paddingHorizontal: 30,
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 200,
    height: 30,
  },
  firstGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    //marginHorizontal: 30
  },
  searchContainer: {
    width: "100%",
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    
  },
  searchInput: {
    width: "100%",
    height: 40,
    color: "#838181",
    paddingHorizontal: 15,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#F4DEAA",
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedCategoryItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#BB5104",
  },
  categoryText: {
    fontSize: 18,
  },
  selectedCategoryText: {
    color: "#BB5104",
  },
  scrollView: {
    marginTop: 10, // Ajuste conforme necessário para evitar a sobreposição com a barra de navegação
    height: "100%",
    marginLeft: 30
  },
  juiceItemHorizontal: {
    alignItems: "center",
    marginRight: 30,
    marginBottom: 30,
  },
  juiceImageHorizontal: {
    width: 100,
    height: 100,
  },
  juiceNameHorizontal: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#838181",
  },
  catalogText: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 20
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
