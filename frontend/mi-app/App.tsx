import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { ProveedorAuth } from "./context/AuthContext";


export default function App() {

  return (
    <ProveedorAuth>
      <AppNavigator />
    </ProveedorAuth>
  );
}
