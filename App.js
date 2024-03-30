import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Splash from "./components/Splash";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }} // Aqui está a atualização
        />
        <Stack.Screen
          name="Home"
          component={Home}
          // Se você quiser ocultar o cabeçalho em outras telas também, você pode adicionar a opção aqui
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
