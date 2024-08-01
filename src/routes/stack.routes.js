import { createStackNavigator } from "@react-navigation/stack";

import ExibicaoScreen from "../../components/ExibicaoScreen";
import ShopScreen from "../../components/ShopScreen";
import PerfilScreen from "../../components/PerfilScreen";

import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeTabs" component={TabRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="Exibicao" component={ExibicaoScreen} options={{ headerShown: false }} />
            {/*<Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />*/}
        </Stack.Navigator>
    )
}