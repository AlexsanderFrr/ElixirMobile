import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ShopScreen from '../../components/ShopScreen';
import HomeScreen from "../../components/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeScreen}
            />
            
            <Tab.Screen 
                name="Shop"
                component={ShopScreen}
            />
        </Tab.Navigator>
    )
}