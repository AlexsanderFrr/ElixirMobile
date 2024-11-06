import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import css from './styles';

const SocialLogin = ({ request, promptAsync }) => (
    <View style={css.align_Down}>
        <Text style={{ color: "#838181", fontSize: 19, fontWeight: "500" }}>Entre com rede social</Text>
        <View style={css.social_Container}>
            <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
                <Image
                    source={require('../assets/googleAcess.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    </View>
);

export default SocialLogin;