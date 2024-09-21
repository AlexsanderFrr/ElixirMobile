import React, { useContext } from 'react';
import { KeyboardAvoidingView, View, Text, Image } from 'react-native';
import css from '../../components/styles';
import LoginForm from '../../components/LoginForm';
import SocialLogin from '../../components/SocialLogin';
import RegisterSection from '../../components/RegisterSection';


import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import { AuthContext } from '../context/authContext';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { login, loginSocial, isLoading } = useContext(AuthContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "148404174369-1rdjvmj6gvptaqsimhmcf14eaaql9asb.apps.googleusercontent.com",
    webClientId: "148404174369-lhjrjf9qilr71oohe32ccpv6689047ol.apps.googleusercontent.com"
  });

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View style={[css.logo_login]}>
        <Text style={css.text_welcome}>Bem vindo a</Text>
        <Image
          source={require('../../assets/logo.png')}
          style={css.img_logo}
          resizeMode="contain"
        />
      </View>
      <LoginForm login={login} isLoading={isLoading} />
      <SocialLogin request={request} promptAsync={promptAsync} />
      <RegisterSection navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;