import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar = ({ onBack }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30, marginHorizontal: 30 }}>
        <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>
    </View>
);

export default HeaderBar;
