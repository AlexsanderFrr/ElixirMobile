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

      <View style={styles.main}>

        <View style={styles.temp}>
          <Text style={styles.textTemp}>Pronto em 3 - 5 min</Text>
        </View>

        <View>
          <Text style={styles.nameJuice}>Suco de chá verde</Text>
          <View style={styles.propertyJuice}>
            <Text style={styles.textProperty}>Imunidade</Text>
            <Text style={styles.textProperty}>detox</Text>
            <Text style={styles.textProperty}>frutas & verduras</Text>
          </View>
        </View>

        <View style={styles.itensContainer}>
          <Text style={styles.titleIngredient}>Ingredientes:</Text>
          <View style={styles.ingredient}>
            <Image source={require("../assets/agua.png")} style={{ marginRight: 30 }} />
            <Image source={require("../assets/cenoura.png")} style={{ marginRight: 30 }} />
            <Image source={require("../assets/limao.png")} style={{ marginRight: 30 }} />
            <Image source={require("../assets/gengibre.png")} style={{ marginRight: 30 }} />
            <Image source={require("../assets/mel.png")} style={{ marginRight: 30 }} />
          </View>

          <View style={styles.ingredientName}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500", marginRight: 24 }}>Água</Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500", marginRight: 28 }}>Cenoura</Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500", marginRight: 17 }}>Limão</Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500", marginRight: 24 }}>Gengibre</Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>Mel</Text>
          </View>
        </View>

        <View style={styles.benefContainer}>
          <Text style={styles.titleBenefits}>Benefícios:</Text>
          <Text style={styles.benefitsInfo}>Hidratação e Nutrição da Pele, Desintoxicação Natural, Melhora a Digestão, Regulação do Açúcar no Sangue, Melhora da Performance Mental.</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  temp: {
    justifyContent: "center",
    alignItems: "center",
    //position: "absolute",
  },
  textTemp: {
    backgroundColor: "#fff",
    fontWeight: "600",
    fontSize: 15,
    position: "absolute",
    bottom: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  main: {
    backgroundColor: "#BB5104",
    height: "75%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  nameJuice: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
  },
  propertyJuice: {
    flexDirection: "row",
  },
  textProperty: {
    color: "#DC9B00",
    backgroundColor: "#F4DEAA",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 15,
  },
  itensContainer: {
    marginTop: 30
  },
  titleIngredient: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  ingredient: {
    flexDirection: "row",
    marginBottom: 5
  },
  ingredientName: {
    flexDirection: "row",
  },
  benefContainer: {
    marginTop: 30
  },
  titleBenefits: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 15
  },
  benefitsInfo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
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
