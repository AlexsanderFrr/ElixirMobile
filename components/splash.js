import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const iconSize = 30;

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Simula um tempo de carregamento
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // Função para gerar a grade de ícones de taça
  const renderCupIcons = () => {
    const rows = 8; // Número de linhas
    const colsPerRow = [2, 3, 2, 3]; // Número de colunas em cada linha
    const icons = [];
    let colIndex = 0;

    for (let i = 0; i < rows; i++) {
      const cols = colsPerRow[colIndex]; // Obtém o número de colunas para esta linha
      const horizontalSpacing = width / (cols + 1); // Espaçamento horizontal entre os ícones
      const verticalSpacing = height / (rows + 1); // Espaçamento vertical entre os ícones

      for (let j = 0; j < cols; j++) {
        const left = (j + 1) * horizontalSpacing - iconSize / 2;
        const top = (i + 1) * verticalSpacing - iconSize / 2;

        icons.push(
          <Image
            key={`${i}-${j}`}
            source={require("../assets/emoji-tropical-drink.png")}
            style={[
              styles.cupIcon,
              { left, top } // Define as posições dinâmicas
            ]}
            resizeMode="contain"
          />
        );
      }

      colIndex = (colIndex + 1) % colsPerRow.length; // Avança para o próximo índice de coluna
    }

    return icons;
  };

  return (
    <View style={styles.container}>
      {renderCupIcons()}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DEAA",
    justifyContent: "center",
    alignItems: "center",
  },
  cupIcon: {
    width: iconSize,
    height: iconSize,
    position: "absolute",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Splash;
