import React from "react";
import Routes from "./src/routes/Router";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
