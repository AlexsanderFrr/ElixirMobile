import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Alert
} from "react-native";
import { apiEndpoint } from "../config/constantes";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [juices, setJuices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Recomendado");
  const [searchText, setSearchText] = useState("");
  const [filteredJuices, setFilteredJuices] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedJuice, setSelectedJuice] = useState(null);

  useEffect(() => {
    const fetchJuices = async (search = "") => {
      try {
        const url = search
          ? `${apiEndpoint}/suco/search/${search}`
          : `${apiEndpoint}/suco/all`;
        const response = await fetch(url);
        const data = await response.json();
        setJuices(data);
      } catch (error) {
        console.error("Erro ao buscar sucos: ", error);
      }
    };

    fetchJuices(searchText);
  }, [searchText]);

  useEffect(() => {
    const filterByCategory = () => {
      let filtered = juices;
      switch (selectedCategory) {
        case "Recomendado":
          filtered = juices.slice(0, 10);
          break;
        case "Detox":
          filtered = juices.slice(10, 20);
          break;
        case "Medicinal":
          filtered = juices.slice(20, 30);
          break;
        default:
          filtered = [];
          break;
      }
      setFilteredJuices(filtered);
    };

    filterByCategory();
  }, [selectedCategory, juices]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSearchText(""); // Limpa o texto de pesquisa ao mudar de categoria
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredBySearch = () => {
    return filteredJuices.filter((juice) =>
      juice.nome.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const getImageUrl = (imgPath) => {
    return `${apiEndpoint}${imgPath}`;
  };

  const handleFavoritePress = (juice) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(juice.id)) {
        return prevFavorites.filter((favId) => favId !== juice.id);
      } else {
        return [...prevFavorites, juice.id];
      }
    });
  };

  const handleJuicePress = (juice) => {
    setSelectedJuice(juice);
    setModalVisible(true);
  };

  const renderJuiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.juiceButtonItemVertical}
      onPress={() => handleJuicePress(item)}
    >
      <View style={styles.juiceItemVertical}>
        <Image
          source={{ uri: getImageUrl(item.img1) }}
          style={styles.juiceImageVertical}
          resizeMode="contain"
        />
        <View style={styles.juiceInfoVertical}>
          <Text style={styles.juiceNameVertical}>{item.nome}</Text>
          <Text style={styles.juiceFunctionVertical}>{item.beneficios}</Text>
          <TouchableOpacity
            onPress={() => handleFavoritePress(item)}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={favorites.includes(item.id) ? "heart" : "heart-outline"}
              size={24}
              color={favorites.includes(item.id) ? "#FF6347" : "#838181"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <Ionicons name="chatbubble-ellipses-outline" size={30} color={"#fff"} />
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

        {!searchText && (
          <ScrollView horizontal style={styles.scrollView}>
            {filteredJuices.map((juice) => (
              <View key={juice.id} style={styles.juiceItemHorizontal}>
                <Image
                  source={{ uri: getImageUrl(juice.img1) }}
                  style={styles.juiceImageHorizontal}
                  resizeMode="contain"
                />
                <Text style={styles.juiceNameHorizontal}>{juice.nome}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.separator} />
      <Text style={styles.catalogText}>Catálogo</Text>

      <FlatList
        data={searchText ? filteredBySearch() : filteredJuices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJuiceItem}
        contentContainerStyle={styles.flatListContainer}
      />

      {selectedJuice && (
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: getImageUrl(selectedJuice.img1) }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>{selectedJuice.nome}</Text>
              <Text style={styles.modalDescription}>{selectedJuice.beneficios}</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    paddingHorizontal: 30,
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
    marginTop: 10,
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
    fontWeight: "500",
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
    flex: 1,
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
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#BB5104",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalCloseButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default HomeScreen;
