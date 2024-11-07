import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import css from '../../components/styles';
import LogoCadastro from '../../components/Cadastro/LogoCadastro';
import SocialSignUp from '../../components/SocialLogin';
import CadastroForm from '../../components/Cadastro/CadastroForm';
import LoginRedirect from '../../components/Cadastro/LoginRedirect';

const CadastroScreen = ({ navigation }) => (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
        <LogoCadastro />
        <SocialSignUp />
        <CadastroForm navigation={navigation} />
        <LoginRedirect navigation={navigation} />
    </KeyboardAvoidingView>
);

export default CadastroScreen;
