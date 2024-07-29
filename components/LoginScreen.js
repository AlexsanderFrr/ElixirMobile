import React, { useEffect, useState, useContext } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../src/context/authContext';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

WebBrowser.maybeCompleteAuthSession();

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const { login } = useContext(AuthContext);

  const { control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "148404174369-1rdjvmj6gvptaqsimhmcf14eaaql9asb.apps.googleusercontent.com",
    webClientId: "148404174369-lhjrjf9qilr71oohe32ccpv6689047ol.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn(response.authentication.accessToken);
    }
  }, [response]);

  async function handleGoogleSignIn(token) {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      await getUserInfo(token);
    } else {
      setUserInfo(JSON.parse(user));
      navigation.navigate('HomeTabs', { screen: 'Home'});
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate('HomeTabs', { screen: 'Home'} );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View style={[css.logo_login]}>
        <Text style={css.text_welcome}>Bem vindo a</Text>
        <Image
          source={require('../assets/logo.png')}
          style={css.img_logo}
          resizeMode="contain"
        />
      </View>

      <View style={css.login__form}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 30 }}>Faça login na sua conta</Text>
        </View>

        {errors.email && <Text style={css.labelError}>{errors.email?.message}</Text>}
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur } }) => (
            <TextInput
              style={[css.login__input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#eb0909'
              }]}
              placeholder='Email:' placeholderTextColor='#B1B1B1'
              onChangeText={(text) => setEmail(text)}
              onBlur={onBlur}
              value={email}
            />
          )}
        />

        {errors.password && <Text style={css.labelError}>{errors.password?.message}</Text>}
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur } }) => (
            <TextInput
              style={[css.login__input, {
                borderWidth: errors.password && 1,
                borderColor: errors.password && '#eb0909'
              }]}
              placeholder='Senha:'
              placeholderTextColor='#B1B1B1'
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              onBlur={onBlur}
              value={password}
            />
          )}
        />

        <TouchableOpacity style={css.login__button} onPress={() => {
          login(email, password)
        }}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={css.align_Down}>
          <Text style={{ color: "#838181", fontSize: 19, fontWeight: "500" }}>Entre com rede social</Text>

          <View style={css.social_Container}>
            <Image
              source={require('../assets/faceAcess.png')}
              //style={{ width: 25, height: 41 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}>
              <Image
                source={require('../assets/googleAcess.png')}
                //style={{ maxWidth: 40, height: 41 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/emailAcess.png')}
              //style={{ width: 25, height: 41 }}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={css.register_button} onPress={() => { navigation.navigate('Cadastro') }}>
            <View style={css.textRegisterAlign}>
              <Text style={css.register_firstText}>Não possui uma conta?</Text>
              <Text style={css.register_secondText}>Cadastre-se</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
