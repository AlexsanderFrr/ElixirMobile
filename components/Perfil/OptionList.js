import React from "react";
import { View } from "react-native";
import ProfileOption from "./ProfileOption";
import styles from "./perfilStyles";

const OptionList = ({ onNavigateEditProfile, onNavigateFavoritos, onLogout }) => (
    <View style={styles.groupOption}>
        <ProfileOption
            icon={require("../../assets/iconEdit.png")}
            label="Editar Perfil"
            onPress={onNavigateEditProfile}
        />
        <View style={[styles.separator, { opacity: 0.1 }]} />
        <ProfileOption
            icon={require("../../assets/iconCora.png")}
            label="Favoritos"
            onPress={onNavigateFavoritos}
        />
        <View style={[styles.separator, { opacity: 0.1 }]} />
        <ProfileOption
            icon={require("../../assets/iconLogOut.png")}
            label="Sair"
            onPress={onLogout}
        />
        <View style={[styles.separator, { opacity: 0.1 }]} />
    </View>
);

export default OptionList;