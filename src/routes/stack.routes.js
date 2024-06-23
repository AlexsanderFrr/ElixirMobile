import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../../components/SplashScreen";
import LoginScreen from "../../components/LoginScreen";
import CadastroScreen from "../../components/CadastroScreen";
import ExibicaoScreen from "../../components/ExibicaoScreen";

import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Elixir" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={TabRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Exibicao" component={ExibicaoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}