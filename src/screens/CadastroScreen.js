import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import css from '../../components/styles';
import LogoCadastro from '../../components/Cadastro/LogoCadastro';
import SocialSignUp from '../../components/SocialLogin';
import CadastroForm from '../../components/Cadastro/CadastroForm';
import LoginRedirect from '../../components/Cadastro/LoginRedirect';
import DividerWithText from '../../components/DividerWithText';

const CadastroScreen = ({ navigation }) => (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
        <LogoCadastro />
        <CadastroForm navigation={navigation} />
        <DividerWithText />
        <SocialSignUp />
        <LoginRedirect navigation={navigation} />
    </KeyboardAvoidingView>
);

export default CadastroScreen;
