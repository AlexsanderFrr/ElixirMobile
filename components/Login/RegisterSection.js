import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import css from '../styles';

const RegisterSection = ({ navigation }) => (
  <TouchableOpacity style={css.register_button} onPress={() => navigation.navigate('Cadastro')}>
    <View style={css.textRegisterAlign}>
      <Text style={css.register_firstText}>Não possui uma conta?</Text>
      <Text style={css.register_secondText}>Cadastre-se</Text>
    </View>
  </TouchableOpacity>
);

export default RegisterSection;
