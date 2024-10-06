import React from "react";
import { Text } from 'react-native';
import css from './styles';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <Text style={css.errorMessage}>
            {message}
        </Text>
    );
};

export default ErrorMessage;