import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./perfilStyles";

const ProfileOption = ({ icon, label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
        <View style={styles.optionContent}>
            <View style={styles.option}>
                <Image source={icon} />
                <Text style={[styles.text, { fontSize: 16, fontWeight: "600", marginLeft: 10 }]}>
                    {label}
                </Text>
            </View>
            <Ionicons name="arrow-forward" size={40} color="#F24E1E" />
        </View>
    </TouchableOpacity>
);

export default ProfileOption;