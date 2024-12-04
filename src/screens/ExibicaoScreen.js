import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Exibicao/Header";
import JuiceImage from "../../components/Exibicao/JuiceImage";
import JuiceProperties from "../../components/Exibicao/JuiceProperties";
import IngredientList from "../../components/Exibicao/IngredientList";
import JuiceBenefits from "../../components/Exibicao/JuiceBenefits";

const ExibicaoScreen = () => {
  const route = useRoute();

  const {
    nome,
    benefits: juiceBenefits,
    image,
    ingredients
  } = route.params;

  return (
    <View style={styles.container}>
      <JuiceImage imageUri={image} />
      <Header />
      <View style={styles.main}>
        <JuiceProperties name={nome} />
        {/* <IngredientList ingredients={ingredients} /> */}
        <JuiceBenefits benefits={juiceBenefits} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: "#F4DEAA",
    height: "75%",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
});

export default ExibicaoScreen;
