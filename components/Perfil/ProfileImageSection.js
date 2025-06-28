import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./perfilStyles";

const ProfileImageSection = ({ image, userInfo, onPickImage }) => {
    const navigation = useNavigation();

    // Remove o estado local e usa diretamente as props
    const getImageSource = () => {
        if (image) {
            return { uri: image };
        }
        if (userInfo?.imagem) {
            // Adiciona timestamp para evitar cache
            return { uri: `${userInfo.imagem}?t=${new Date().getTime()}` };
        }
        if (userInfo?.picture) {
            return { uri: `${userInfo.picture}?t=${new Date().getTime()}` };
        }
        return require("../../assets/emptyProfile.jpg");
    };

    return (
        <View style={{ alignSelf: "center" }}>
            <Text style={styles.textMain}>Meu Perfil</Text>
            <View style={styles.profileImage}>
                <Image
                    source={getImageSource()}
                    style={styles.image}
                    key={`${userInfo?.imagem || 'default'}`}
                />
            </View>
            <View style={styles.dm}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <MaterialIcons name="chat" size={18} color={"#F4DEAA"} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPickImage}>
                <View style={styles.add}>
                    <Ionicons name="add" size={32} color={"#F4DEAA"} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileImageSection;