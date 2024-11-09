import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.iconButton}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back" size={40} color="#BB5114" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconButton}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={40} color="#BB5114" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 30,
    paddingHorizontal: 30,
    width: "100%",
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
  },
});
