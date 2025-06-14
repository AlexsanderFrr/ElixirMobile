import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import ShopScreen from '../screens/ShopScreen';
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ChatScreen from '../screens/ChatScreen';
import favoriteScreen from "../screens/favoriteScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarStyle: {
                position: "absolute",
                backgroundColor: '#BB5104',
                borderTopWidth: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: 60,
            }
            }}>
            <Tab.Screen
                name="TabsHome"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="home" color={"#F5F5F5"} size={size} />;
                        }
                        return <Ionicons name="home-outline" color={color} size={size} />;
                    }
                }}
            />

            <Tab.Screen
                name="Favoritos"
                component={favoriteScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="heart" color={"#F5F5F5"} size={size} />;
                        }
                        return <Ionicons name="heart-outline" color={color} size={size} />;
                    }
                }}
            />

            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="add-circle-outline" color={"#F5F5F5"} size={size} />;
                        }
                        return <Ionicons name="add-circle" color={color} size={size} />;
                    }
                }}
            />

            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="chatbubbles" color={"#F5F5F5"} size={size} />;
                        }
                        return <Ionicons name="chatbubbles-outline" color={color} size={size} />;
                    }
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="person" color={"#F5F5F5"} size={size} />;
                        }
                        return <Ionicons name="person-outline" color={color} size={size} />;
                    }
                }}
            />
        </Tab.Navigator>
    );
}
