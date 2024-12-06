import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const MenuOptions = ({ options }) => (
  <View>
    {options.map((option, index) => (
      <View key={index}>
        <TouchableOpacity onPress={option.action}>
          <View style={styles.option}>
            <Image source={option.icon} />
            <Text style={styles.text}>{option.label}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.separator, { opacity: 0.1 }]} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: "#000",
  },
});

export default MenuOptions;