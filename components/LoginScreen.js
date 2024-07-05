import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { AuthContext } from '../src/context/authContext';

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {login} = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

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
          render={({ field: { onChange, onBlur } }) => (
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
          render={({ field: { onChange, onBlur } }) => (
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

        <TouchableOpacity style={css.login__button} onPress={handleSubmit(login)}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={css.align_Down}>
          <Text style={{ color: "#838181", fontSize: 17 }}>Entre com rede social</Text>

          <View style={css.social_Container}>
            <Image
              source={require('../assets/faceAcess.png')}
              //style={{ width: 25, height: 41 }}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/googleAcess.png')}
              //style={{ maxWidth: 40, height: 41 }}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/emailAcess.png')}
              //style={{ width: 25, height: 41 }}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={css.register_button} onPress={() => { navigation.navigate('Cadastro') }}>
            <Text style={css.register_buttonText}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
