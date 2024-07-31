import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './authSlice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  const handleLogin = () => {
    dispatch(login({ username: 'joaopaulo', email: 'joaopaulo@exemplo.com' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Text>Bem-vindo, {user.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text>Você não está logado.</Text>
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
}

export default App;
