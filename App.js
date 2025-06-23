import React from "react";
import Routes from "./src/routes/Router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from "./src/context/authContext";
import store from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
    <Provider store={ store }>
      <Routes/>
    </Provider>
    </SafeAreaProvider>
    </AuthProvider>
  );
}
