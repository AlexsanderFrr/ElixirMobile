import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./perfilStyles"; // exporte os styles separadamente, se quiser

const ProfileImageSection = ({ image, userInfo, onPickImage }) => {
    const imageSource = image
        ? { uri: image }
        : userInfo?.imagem || userInfo?.picture
            ? { uri: `${userInfo.imagem || userInfo.picture}?t=${new Date().getTime()}` }
            : require("../../assets/adaptive-icon.png");

    return (
        <View style={{ alignSelf: "center" }}>
            <Text style={styles.textMain}>Meu Perfil</Text>
            <View style={styles.profileImage}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.dm}>
                <MaterialIcons name="chat" size={18} color={"#F4DEAA"} />
            </View>
            <View style={styles.active}></View>
            <TouchableOpacity onPress={onPickImage}>
                <View style={styles.add}>
                    <Ionicons name="add" size={38} color={"#F4DEAA"} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileImageSection;
