import React from "react";
import Routes from "./src/routes/Router";
import { AuthProvider } from "./src/context/authContext";
import store from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <AuthProvider>
    <Provider store={ store }>
      <Routes/>
    </Provider>
    </AuthProvider>
  );
}
