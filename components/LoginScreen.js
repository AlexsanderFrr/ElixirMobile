import React, { useState, useEffect, useContext } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import css from './styles';

import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import { AuthContext } from '../src/context/authContext';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons'; // Ícones para e-mail e senha
import { FontAwesome } from '@expo/vector-icons'; // Ícone para visibilidade da senha

WebBrowser.maybeCompleteAuthSession();

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe sua senha")
});

const LoginScreen = ({ navigation }) => {
  const { login, loginSocial, isLoading } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "148404174369-1rdjvmj6gvptaqsimhmcf14eaaql9asb.apps.googleusercontent.com",
    webClientId: "148404174369-lhjrjf9qilr71oohe32ccpv6689047ol.apps.googleusercontent.com"
  });

  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    if (response?.type === "success") {
      loginSocial(response.authentication.accessToken);
    }
  }, [response]);

  const onSubmit = data => {
    login(data.email, data.password);
  };

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
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 30 }}>Faça login na sua conta</Text>

        {errors.email && <Text style={css.labelError}>{errors.email?.message}</Text>}
        <View style={css.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#F5B700" style={css.iconStyle} />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  css.login__input,
                  {
                    borderWidth: errors.email ? 1 : 0,
                    borderColor: errors.email ? '#eb0909' : 'transparent',
                    paddingLeft: 40 // Ajusta espaço para o ícone dentro do campo
                  }
                ]}
                placeholder='Email'
                placeholderTextColor='#B1B1B1'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        {errors.password && <Text style={css.labelError}>{errors.password?.message}</Text>}
        <View style={css.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#F5B700" style={css.iconStyle} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={css.passwordContainer}>
                <TextInput
                  style={[
                    css.login__input,
                    {
                      borderWidth: errors.password ? 1 : 0,
                      borderColor: errors.password ? '#eb0909' : 'transparent',
                      paddingLeft: 40, // Espaço para o ícone de "lock" à esquerda
                      paddingRight: 40, // Espaço para o ícone de visibilidade à direita
                    }
                  ]}
                  placeholder="Senha"
                  placeholderTextColor="#B1B1B1"
                  secureTextEntry={passwordVisible} // Controla visibilidade da senha
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={css.eyeIcon}>
                  <FontAwesome
                    name={passwordVisible ? "eye-slash" : "eye"}
                    size={24}
                    color="#F5B700"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={css.login__button} onPress={handleSubmit(onSubmit)}>
          {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={css.login__buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <View style={css.align_Down}>
          <Text style={{ color: "#838181", fontSize: 19, fontWeight: "500" }}>Entre com rede social</Text>

          <View style={css.social_Container}>
            <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
              <Image
                source={require('../assets/googleAcess.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={css.register_button} onPress={() => navigation.navigate('Cadastro')}>
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
