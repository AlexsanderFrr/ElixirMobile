import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./perfilStyles";

const ProfileOption = ({ icon, label, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.option}>
            <Image source={icon} />
            <Text style={[styles.text, { fontSize: 16, fontWeight: "600", marginLeft: 10 }]}>
                {label}
            </Text>
        </View>
    </TouchableOpacity>
);

export default ProfileOption;
