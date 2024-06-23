import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExibicaoScreen = ({ route }) => {
  const navigation = useNavigation();

  // Extrair as informações do suco da rota
  const { name, function: juiceFunction, image } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* Barra de notificações com a mesma cor do cabeçalho */}
      <StatusBar backgroundColor="#BB5104" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        {/* Botão de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>◀</Text>
        </TouchableOpacity>

        {/* Título da tela */}
        <Text style={styles.title}>Detalhes do Suco</Text>

        {/* Espaço vazio para alinhar o título */}
        <View style={{ flex: 1 }} />
      </View>

      {/* Conteúdo da tela */}
      <View style={styles.container}>
        {/* Container para os textos */}
        <View style={styles.textContainer}>
          {/* Nome do suco */}
          <Text style={styles.name}>{name}</Text>

          {/* Função do suco */}
          <Text style={styles.function}>{juiceFunction}</Text>
        </View>

        {/* Imagem do suco */}
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#BB5104",
  },
  backButton: {
    color: "#F4DEAA",
    fontSize: 35,
  },
  title: {
    color: "#F4DEAA",
    fontSize: 18,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#F4DEAA",
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  function: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 300,
  },
});

export default ExibicaoScreen;
