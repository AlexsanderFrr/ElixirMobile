import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ProfileInfo = ({ userInfo, image, pickImage }) => (
  <View style={{ alignSelf: "center" }}>
    <Text style={styles.textMain}>Meu Perfil</Text>
    <View style={styles.profileImage}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="center" />
      ) : userInfo?.imagem || userInfo?.picture ? (
        <Image
          source={{ uri: userInfo.imagem || userInfo.picture }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
    <View style={styles.dm}>
      <MaterialIcons name="chat" size={18} color="#F4DEAA" />
    </View>
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.add}>
        <Ionicons name="add" size={38} color="#F4DEAA" />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  // Estilos aqui
});

export default ProfileInfo;