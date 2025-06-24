import React, { useContext, useEffect } from 'react';
import { KeyboardAvoidingView, } from 'react-native';
import css from '../../components/styles';
import LogoLogin from '../../components/Login/LogoLogin';
import LoginForm from '../../components/Login/LoginForm';
import DividerWithText from '../../components/Login/DividerWithText';
import SocialLogin from '../../components/Login/SocialLogin';
import RegisterSection from '../../components/Login/RegisterSection';

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
  
  useEffect(() => {
    if (response?.type === "success") {
      loginSocial(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <KeyboardAvoidingView style={[css.containerLogin, css.whitebg]}>
      <LogoLogin />
      <LoginForm login={login} isLoading={isLoading} />
      <DividerWithText />
      <SocialLogin request={request} promptAsync={promptAsync} />
      <RegisterSection navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;