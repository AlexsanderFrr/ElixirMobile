import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const LoginScreen = () => {

  const [display, setDisplay] = useState('none');

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View >
        <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Bem vindo a</Text>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 256, height: 41 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight:'600' }}>Faça login na sua conta</Text>
        <Text style={css.login__msg(display)}>Usuário ou senha
          inválidos!</Text>
      </View>
      <View style={css.login__form}>
        <TextInput style={css.login__input} placeholder='Email:' />
        <TextInput style={css.login__input} placeholder='Senha:'
          secureTextEntry={true} />
        <TouchableOpacity style={css.login__button} onPress={() =>
          setDisplay('flex')}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
