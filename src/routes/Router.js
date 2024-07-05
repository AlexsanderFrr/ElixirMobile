import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import AuthStack from "./auth.stack.routes";

export default function Routes() {
    const auth = false;
    return (
        <NavigationContainer>
            {auth ? <StackRoutes /> : <AuthStack/>}
        </NavigationContainer>
    )
}