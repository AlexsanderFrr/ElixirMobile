import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./perfilStyles"; // exporte os styles separadamente, se quiser

const ProfileImageSection = ({ image, userInfo, onPickImage }) => {
    const [fotoPerfil, setFotoPerfil] = useState(null);

    useEffect(() => {
        // Sempre que `image` (selecionada localmente) ou `userInfo.imagem` mudar, atualize
        if (image) {
            setFotoPerfil({ uri: image });
        } else if (userInfo?.imagem || userInfo?.picture) {
            const uri = `${userInfo.imagem || userInfo.picture}?t=${new Date().getTime()}`;
            setFotoPerfil({ uri });
        } else {
            setFotoPerfil(require("../../assets/emptyProfile.jpg"));
        }
    }, [image, userInfo]);

    return (
        <View style={{ alignSelf: "center" }}>
            <Text style={styles.textMain}>Meu Perfil</Text>
            <View style={styles.profileImage}>
                <Image source={fotoPerfil} style={styles.image} />
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
