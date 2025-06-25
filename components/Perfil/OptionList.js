import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProfileOption from "./ProfileOption";
import styles from "./perfilStyles";

const OptionList = ({ onNavigateEditProfile, onNavigateFavoritos, onLogout }) => (
    <View style={styles.groupOption}>
        <View style={styles.optionContent}>
            <ProfileOption
                icon={require("../../assets/iconEdit.png")}
                label="Editar Perfil"
                onPress={onNavigateEditProfile}
            />
            <Ionicons name="arrow-forward" size={40} color="#F24E1E" />
        </View>
        <View style={[styles.separator, { opacity: 0.1 }]} />
        <View style={styles.optionContent}>
            <ProfileOption
                icon={require("../../assets/iconDiag.png")}
                label="Meus Diagnósticos"
            />
            <Ionicons name="arrow-forward" size={40} color="#F24E1E" />
        </View>
        <View style={[styles.separator, { opacity: 0.1 }]} />
        <View style={styles.optionContent}>
            <ProfileOption
                icon={require("../../assets/iconCora.png")}
                label="Favoritos"
                onPress={onNavigateFavoritos}
            />
            <Ionicons name="arrow-forward" size={40} color="#F24E1E" />
        </View>
        <View style={[styles.separator, { opacity: 0.1 }]} />
        <View style={styles.optionContent}>
            <ProfileOption
                icon={require("../../assets/iconLogOut.png")}
                label="Sair"
                onPress={onLogout}
            />
            <Ionicons name="arrow-forward" size={40} color="#F24E1E" />
        </View>
        <View style={[styles.separator, { opacity: 0.1 }]} />
    </View>
);

export default OptionList;
