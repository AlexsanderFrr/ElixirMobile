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

  const {
    nome,
    benefits: juiceBenefits,
    image,
    ingredients: listIngredientes,
    preparationSteps,
  } = route.params;

  return (
    <View style={styles.container}>
      <JuiceImage imageUri={image} />
      <Header />
      {/* Tornar todo o conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.main}>
        <JuiceProperties name={nome} />
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
    backgroundColor: "#F4DEAA",
  },
  main: {
    height: '70%',
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
});

export default ExibicaoScreen;
