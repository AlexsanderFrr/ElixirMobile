import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'

import ShopScreen from '../../components/ShopScreen';
import HomeScreen from "../../components/HomeScreen";
import PerfilScreen from "../../components/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: ""
                }}
            />

            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="shopping-bag" color={color} size={size} />,
                    tabBarLabel: ""
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="circle" color={color} size={size} />,
                    tabBarLabel: ""
                }}
            />

        </Tab.Navigator>
    )
}