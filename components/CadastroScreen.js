import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, } from 'react-native';
import css from './styles';

const CadastroScreen = ({ navigation }) => {

  const [display, setDisplay] = useState('none');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = () => {
  if (email === 'carlos@gmail.com' && password === 'suco123') {
    navigation.navigate('Home');
  } else {
    setDisplay('');
  }
}

  return (
    <KeyboardAvoidingView style={[css.container, css.whitebg]}>
      <View style={[css.logo_login]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>Bem vindo a</Text>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 256, height: 41 }}
          resizeMode="contain"
        />
      </View>

      <View style={css.login__form}>
        <View>
          <Text style={{ fontSize: 20, fontWeight:'600', marginBottom: 30 }}>Faça login na sua conta</Text>
          <Text style={css.login__msg(display)}>Usuário ou senha
          inválidos!</Text>
        </View>

        <TextInput style={css.login__input} placeholder='Email:' placeholderTextColor='#B1B1B1' onChangeText={(text) => setEmail(text)} />

        <TextInput style={css.login__input} placeholder='Senha:' placeholderTextColor='#B1B1B1' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

        <TouchableOpacity style={css.login__button} onPress={handleLogin}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={css.align_Down}>
          <Text style={{color:"#838181", fontSize: 17}}>Entre com rede social</Text>

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

          <TouchableOpacity style={css.register_button}>
            <Text style={css.register_buttonText}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

export default CadastroScreen;
