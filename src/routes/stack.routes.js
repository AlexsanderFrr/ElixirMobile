import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import ExibicaoScreen from "../screens/ExibicaoScreen";
import ShopScreen from "../screens/ShopScreen";
import PerfilScreen from "../screens/PerfilScreen";
import EditProfile from "../screens/EditProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import FavoriteScreen from "../screens/favoriteScreen";

import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TabRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Exibicao" component={ExibicaoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Shop" component={ShopScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Favoritos" component={FavoriteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}