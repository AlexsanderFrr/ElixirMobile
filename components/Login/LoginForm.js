import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from '../styles';
import InputField from '../InputField';
import PasswordField from '../PasswordField';
import ErrorMessage from '../ErrorMessage';

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe sua senha")
});

const LoginForm = ({ login, isLoading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    login(data.email, data.password);
  };

  return (
    <View style={css.login__form}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>Faça login na sua conta</Text>
      
      {/* Campo de Email */}
      <ErrorMessage message={errors.email?.message} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            icon="mail-outline"
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email}
          />
        )}
      />

      {/* Campo de Senha */}
      <ErrorMessage message={errors.password?.message} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordField
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password}
          />
        )}
      />

      {/* Botão Esqueceu sua senha? */}
      <TouchableOpacity style={css.forgotPasswordButton} onPress={() => {/* Ação para redefinir senha */}}>
        <Text style={css.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão de Entrar */}
      <TouchableOpacity style={css.login__button} onPress={handleSubmit(onSubmit)}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={css.login__buttonText}>Entrar</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
