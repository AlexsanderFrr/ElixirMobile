import React from "react";
<<<<<<< HEAD
import Routes from "./src/routes";
import store from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
=======
import Routes from "./src/routes/Router";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
>>>>>>> origin/HomeScreen
  );
}
