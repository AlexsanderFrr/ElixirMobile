import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from '../EditProfile/styles';

const FormInput = ({ 
    icon, 
    iconLib: Icon, 
    placeholder, 
    value, 
    onChangeText, 
    error, 
    secureTextEntry, 
    keyboardType, 
    autoCapitalize 
}) => (
    <View style={styles.formGroup}>
        <View style={styles.inputContainer}>
            <Icon name={icon} size={18} color="#F24E1E" style={styles.inputIcon} />
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
);

export default FormInput;