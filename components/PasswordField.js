import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import css from './styles';

const PasswordField = ({ value, onChangeText, onBlur, error }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <View style={css.inputContainer}>
            <Ionicons name='lock-closed-outline' size={24} color='#F5B700' style={css.iconStyle} />
            <View style={css.passwordContainer}>
                <TextInput
                    style={[
                        css.login__input,
                        {
                            borderWidth: 1.5,
                            borderColor: error ? '#eb0909' : '#FFB100',
                            paddingLeft: 48,
                            paddingRight: 40
                        }
                    ]}
                    placeholder="Senha"
                    placeholderTextColor="#B1B1B1"
                    secureTextEntry={passwordVisible}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={css.eyeIcon}>
                    <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={24} color="#F5B700" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PasswordField;