import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
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
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, backgroundColor: "#BB5104" }}>
        {/* Botão de voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#F4DEAA", fontSize: 35 }}>◀</Text>
        </TouchableOpacity>

        {/* Título da tela */}
        <Text style={{ color: "#F4DEAA", fontSize: 18 }}>Detalhes do Suco</Text>

        {/* Espaço vazio para alinhar o título */}
        <View />
      </View>

      {/* Conteúdo da tela */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Nome do suco */}
        <Text>{name}</Text>

        {/* Função do suco */}
        <Text>{juiceFunction}</Text>

        {/* Imagem do suco */}
        <Image source={image} style={{ width: 100, height: 100 }} />
      </View>
    </View>
  );
};

export default ExibicaoScreen;
