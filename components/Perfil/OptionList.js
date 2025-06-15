import React from "react";
import { View } from "react-native";
import ProfileOption from "./ProfileOption";
import styles from "./perfilStyles";

const OptionList = ({ onNavigateDiagnosticos, onNavigateFavoritos, onLogout }) => (
    <View style={styles.groupOption}>
        <ProfileOption
            icon={require("../../assets/iconDiag.png")}
            label="Meus Diagnósticos"
            onPress={onNavigateDiagnosticos}
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
