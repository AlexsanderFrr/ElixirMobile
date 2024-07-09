import React from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'

const ExibicaoScreen = ({ route }) => {
  const navigation = useNavigation();

  // Extrair as informações do suco da rota
  const { name, function: juiceFunction, image } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#BB5104" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={40} color={"#fff"}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name='notifications-outline' size={40} color={"#fff"}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Image source={image} style={styles.image} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DEAA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: "#BB5104",
    height: "25%"
  },
  title: {
    color: "#F4DEAA",
    fontSize: 18,
  },
  main: {
    backgroundColor: "#8572FF",
    height: "75%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
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
