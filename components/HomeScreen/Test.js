// Importações
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
    StatusBar
} from "react-native";
import { apiEndpoint } from "../../config/constantes";

// Componente Principal
const HomeScreen = () => {
    const navigation = useNavigation();
    const [juices, setJuices] = useState([]);
    const [filteredJuices, setFilteredJuices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Recomendado");
    const [searchText, setSearchText] = useState("");

    // Função para buscar os dados dos sucos
    useEffect(() => {
        const fetchJuices = async () => {
            try {
                const url = searchText
                    ? `${apiEndpoint}/suco/search/${searchText}`
                    : `${apiEndpoint}/suco/all`;
                const response = await fetch(url);
                const data = await response.json();
                console.log("Data fetched: ", data);
                setJuices(data);
            } catch (error) {
                console.error("Erro ao buscar sucos: ", error);
            }
        };
        fetchJuices(searchText);
    }, [searchText]);

    // Função para lidar com a busca
    const handleSearch = (text) => {
        setSearchText(text);
    };

    // Filtra os sucos com base no texto de pesquisa
    const filteredBySearch = () => {
        return filteredJuices.filter((juice) =>
            juice.nome.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    // Obtém a URL da imagem
    const getImageUrl = (imgPath) => {
        return `${apiEndpoint}${imgPath}`;
    };

    // Renderização do componente
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#BB5104" />

            {/* Cabeçalho */}
            <View style={styles.header}>
                <View style={styles.firstGroup}>
                    <Image
                        source={require("../../assets/logo-branco.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Ionicons name="chatbubble-ellipses-outline" size={30} color="#fff" />
                </View>

                {/* Barra de Pesquisa */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={24} color="#B85A25" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="🔍   Pesquisar..."
                        placeholderTextColor="#838181"
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            {/* ScrollView horizontal de sucos (exibido apenas se não houver texto de pesquisa) */}
            <View>
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

            {/* Linha separadora */}
            <View style={styles.separator} />

            {/* Título do Catálogo */}
            <Text style={styles.catalogText}>Catálogo</Text>

            {/* Lista Vertical de Sucos */}
            <FlatList
                data={searchText ? filteredBySearch() : filteredJuices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.juiceButtonItemVertical}
                        onPress={() => navigation.navigate("Exibicao", {
                            name: item.nome,
                            function: item.beneficios,
                            image: item.img1
                        })}
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
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

// Estilos
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
    scrollView: {
        marginTop: 10,
        height: "100%",
        marginLeft: 30,
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
        marginBottom: 20,
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
    flatListContainer: {
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
