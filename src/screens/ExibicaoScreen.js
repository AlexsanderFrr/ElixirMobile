import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Exibicao/Header";
import JuiceImage from "../../components/Exibicao/JuiceImage";
import JuiceProperties from "../../components/Exibicao/JuiceProperties";
import IngredientList from "../../components/Exibicao/IngredientList";
import JuiceBenefits from "../../components/Exibicao/JuiceBenefits";
import PreparationMethod from "../../components/Exibicao/PreparationMethod";

const ExibicaoScreen = () => {
  const route = useRoute();

  const { item, userToken, favoritos, setFavoritos } = route.params;

  const suco_nome = item.nome || item.suco_nome;
  const juiceBenefits = item.beneficios;
  const listIngredientes = item.ingredientes;
  const preparationSteps = item.modo_de_preparo;
  const image = item.img1;

  return (
    <View style={styles.container}>
      <JuiceImage imageUri={image} />
      <Header item={item} userToken={userToken} favoritos={favoritos} setFavoritos={setFavoritos} />
      {/* Tornar todo o conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.main}>
        <JuiceProperties name={suco_nome} />
        <IngredientList ingredients={listIngredientes} />
        <JuiceBenefits benefits={juiceBenefits} />
        <PreparationMethod preparationSteps={preparationSteps} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    backgroundColor: "#F4DEAA",
  },
  main: {
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
});

export default ExibicaoScreen;
