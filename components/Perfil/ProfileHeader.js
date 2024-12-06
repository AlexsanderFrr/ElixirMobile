import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }) => (
  <View style={styles.titleBar}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={40} color="#fff" />
    </TouchableOpacity>
    <Ionicons name="settings-sharp" size={40} color="#fff" />
  </View>
);

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
  },
});

export default Header;
