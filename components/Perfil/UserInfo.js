import React from "react";
import { View, Text } from "react-native";

const UserInfo = ({ userInfo }) => (
    <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ fontWeight: "600", fontSize: 26, fontFamily: "HelveticaNeue" }}>
            {userInfo?.nome || userInfo?.name || "Nome do Usuário"}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HelveticaNeue", color: "#8a8a8a" }}>
            {userInfo?.email || "email@dominio.com"}
        </Text>
    </View>
);

export default UserInfo;
