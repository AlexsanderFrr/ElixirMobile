import React, { useEffect, useState } from "react";
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

  const [juices, setJuices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Recomendado");
  const [searchText, setSearchText] = useState("");
  const [filteredJuices, setFilteredJuices] = useState([]);

  useEffect(() => {

    const fetchJuices = async () => {
      try {
        const response = await fetch('http://localhost:8081/suco/all');
        const data = await response.json();
        console.log("Data fetched: ", data);
        setJuices(data);
      } catch (error) {
        console.error("Erro ao buscar sucos: ", error);
      }
    };

    fetchJuices();
  }, []);

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
                <Text style={styles.juiceNameHorizontal}>{juice.nome}</Text>
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
            style={styles.juiceButtonItemVertical}
            onPress={() => navigation.navigate("Exibicao", { name: item.name, function: item.function, image: item.image })}

          >
            <View style={styles.juiceItemVertical}>
              <Image
                source={item.image}
                style={styles.juiceImageVertical}
                resizeMode="contain"
              />
              <View style={styles.juiceInfoVertical}>
                <Text style={styles.juiceNameVertical}>{item.nome}</Text>
                <Text style={styles.juiceFunctionVertical}>{item.beneficios}</Text>
                <Text style={styles.juicePriceVertical}>{item.img1}</Text>
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
    //justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  juiceImageVertical: {
    width: 120,
    height: 120,
  },
  juiceInfoVertical: {
    marginLeft: 15,
  },
  juiceNameVertical: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  juiceFunctionVertical: {
    fontSize: 14,
    marginBottom: 5,
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
