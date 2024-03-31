import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const LoginScreen = () => {

  const [display, setDisplay] = useState('none');

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 110, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={css.login__msg(display)}>Usuário ou senha
          inválidos!</Text>
      </View>
      <View style={css.login__form}>
        <TextInput style={css.login__input} placeholder='Usuário:' />
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
