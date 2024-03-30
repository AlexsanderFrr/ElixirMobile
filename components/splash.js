import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navega para a próxima tela após o tempo determinado
    }, 3000); // Tempo em milissegundos (3 segundos neste caso)

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('./assets/splash.jpg')} // Substitua pelo caminho da sua imagem de fundo
      style={styles.background}
    >
      {/* Adicione várias imagens de copos de suco aqui */}
      <View style={styles.cup1}></View>
      <View style={styles.cup2}></View>
      <View style={styles.cup3}></View>
      {/* Adicione quantas imagens de copos de suco desejar */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cup1: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    backgroundColor: 'red', // Cor temporária, substitua pela imagem do copo de suco
  },
  cup2: {
    position: 'absolute',
    top: 150,
    left: 150,
    width: 50,
    height: 50,
    backgroundColor: 'green', // Cor temporária, substitua pela imagem do copo de suco
  },
  cup3: {
    position: 'absolute',
    top: 250,
    left: 250,
    width: 50,
    height: 50,
    backgroundColor: 'blue', 
  },
 
});
