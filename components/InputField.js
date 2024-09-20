import React from "react";
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import css from './styles';

const InputField = ({ icon, placeholder, value, onChangeText, onBlur, error }) => (
    <View style={css.inputContainer}>
        <Ionicons name={icon} size={24} color="#F5B700" style={css.iconStyle} />
        <TextInput
            style={[
                css.login__input,
                {
                    borderWidth: 1.5,
                    borderColor: error ? '#eb0909' : '#FFB100',
                    paddingLeft: 42
                }
            ]}
            placeholder={placeholder}
            placeholderTextColor="#B1B1B1"
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
        />
    </View>
);

export default InputField;