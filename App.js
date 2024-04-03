import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/LoginScreen";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import CadastroScreen from "./components/CadastroScreen";
import Routes from "./src/routes";


const Stack = createStackNavigator();

export default function App() {
  return (
    <Routes />
  );
}
