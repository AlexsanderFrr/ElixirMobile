import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import ExibicaoScreen from "../screens/ExibicaoScreen";
import PerfilScreen from "../screens/PerfilScreen";
import EditProfile from "../screens/EditProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import FavoriteScreen from "../screens/favoriteScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AllCategoriesScreen from "../screens/AllCategoriesScreen";

import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TabRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={({ route }) => ({ title: route.params.categoryName })}
            />
            <Stack.Screen name="AllCategoriesScreen" component={AllCategoriesScreen} options={{ headerShown: false }}
            />
            <Stack.Screen name="Exibicao" component={ExibicaoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Favoritos" component={FavoriteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}