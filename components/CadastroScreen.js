//import React, {useState} from "react";
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const CadastroScreen = () => {

    return (
        <KeyboardAvoidingView style={[css.container, css.whitebg]}>
            <View style={css.logo_cadastro}>
                <Text style={css.text_newac}>Criar uma conta</Text>
                <Image
                    source={require('../assets/logo.png')}
                    style={css.img_logocad}
                    resizeMode="contain"
                />

                <View style={css.align_Top}>
                    <View style={css.social_Container}>
                        <Image
                            source={require('../assets/faceAcess.png')}
                            //style={{ width: 25, height: 41 }}
                            resizeMode="contain"
                        />
                        <Image
                            source={require('../assets/googleAcess.png')}
                            //style={{ maxWidth: 40, height: 41 }}
                            resizeMode="contain"
                        />
                        <Image
                            source={require('../assets/emailAcess.png')}
                            //style={{ width: 25, height: 41 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{color:"#838181", fontSize: 17}}>Ou utilize email para cadastro</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );

};

export default CadastroScreen;