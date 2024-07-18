import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'

const ExibicaoScreen = ({ route }) => {
  const navigation = useNavigation();

  // Extrair as informações do suco da rota
  const { nome, function: juiceFunction, image } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#BB5104" />

      <Image
        source={require("../assets/sucodelimao.jpg")}
        style={styles.imageHeader}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={40} color={"#fff"}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name='notifications-outline' size={40} color={"#fff"}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.temp}>
        <Text style={styles.textTemp}>Pronto em 3 - 5 min</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.textTopMainContainer}>
          <Text style={styles.name}>Chá Verde</Text>
          <Text>Imunidade</Text>
          <Text>detox</Text>
          <Text>frutas & verduras</Text>
        </View>

        <View style={styles.itensContainer}>
          <Text>Ingredientes:</Text>
        </View>

        <View style={styles.benefContainer}>
          <Text>Benefícios:</Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DEAA",
  },
  imageHeader: {
    height: "25%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 30,
    paddingHorizontal: 30,
    height: "25%",
    width: "100%"
  },
  title: {
    color: "#F4DEAA",
    fontSize: 18,
  },
  temp: {
    justifyContent: "center",
    alignItems: "center",
    //position: "absolute"
  },
  textTemp: {
    backgroundColor: "#fff",
    fontWeight: "700",
    fontSize: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10
  },
  main: {
    backgroundColor: "#8572FF",
    height: "75%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  textTopMainContainer: {

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
