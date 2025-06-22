import React from "react";
import { Image, StyleSheet } from "react-native";

export default function JuiceImage({ imageUri }) {
  return <Image source={{ uri: imageUri }} style={styles.imageHeader} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  imageHeader: {
    height: 300,
    width: "100%",
  },
});
