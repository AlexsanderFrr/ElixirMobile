import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import ShopScreen from '../../components/ShopScreen';
import HomeScreen from "../../components/HomeScreen";
import PerfilScreen from "../../components/PerfilScreen";

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
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                            return <Ionicons name="home" color={"#F5F5F5"} size={size} />
                        }
                        return <Ionicons name="home-outline" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                            return <Ionicons name="bag-handle-outline" color={"#F5F5F5"} size={size} />
                        }
                        return <Ionicons name="bag-handle" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                            return <Ionicons name="person" color={"#F5F5F5"} size={size} />
                        }
                        return <Ionicons name="person-outline" color={color} size={size} />
                    }
                }}
            />

        </Tab.Navigator>
    )
}