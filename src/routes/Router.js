import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import AuthStack from "./auth.stack.routes";
import { AuthContext } from "../context/authContext";
import { View, ActivityIndicator } from "react-native";

export default function Routes() {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <StackRoutes /> : <AuthStack />}
        </NavigationContainer>
    );
}
