import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function JuiceImage({ imageUri }) {
  return (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: imageUri }} 
        style={styles.imageHeader} 
        resizeMode="cover" 
      />
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  imageHeader: {
    height: 260,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(187, 81, 20, 0.15)',
  },
});