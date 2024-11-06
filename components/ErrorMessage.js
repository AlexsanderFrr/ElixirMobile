import React from "react";
import { Text } from 'react-native';
import css from './styles';

const ErrorMessage = ({ message }) => message ? <Text style={css.labelError}>{message}</Text> : null;

export default ErrorMessage;