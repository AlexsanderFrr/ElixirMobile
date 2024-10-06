import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './styles';
import InputField from './InputField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Por favor, insira um email válido.")
    .required("O campo de email é obrigatório."),
  password: yup
    .string()
    .trim()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número.")
    .matches(/[@$!%*?&#]/, "A senha deve conter pelo menos um caractere especial.")
    .required("O campo de senha é obrigatório"),
});

const LoginForm = ({ login, isLoading }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = data => {
    login(data.email, data.password);
  };

  return (
    <View style={css.login__form}>
      <Text style={css.formTitle}>Faça login na sua conta</Text>

      {/* Campo de Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <InputField
              icon="mail-outline"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <ErrorMessage message={errors.email?.message} />
          </>
        )}
      />

      {/* Campo de Senha */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <PasswordField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              placeholder="Senha"
              error={errors.password}
            />
            <ErrorMessage message={errors.password?.message} />
          </>
        )}
      />

      {/* Botão Esqueceu sua senha? */}
      <TouchableOpacity style={css.forgotPasswordButton} onPress={() => {/* Ação para redefinir senha */ }}>
        <Text style={css.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão de Entrar */}
      <TouchableOpacity style={css.login__button} onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={css.login__buttonText}>Entrar</Text>)}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
