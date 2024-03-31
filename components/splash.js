import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
const Splash = ({ navigation }) => {
  useEffect(() => {
    // Simule um tempo de carregamento
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4DEAA",
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 110, height: 100, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontFamily: "Brush Script MT",
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
      </Text>
    </View>
  );
};
export default Splash;
