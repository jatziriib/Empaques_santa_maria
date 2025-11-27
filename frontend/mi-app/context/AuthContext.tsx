import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipos del contexto
interface TipoContextoAuth {
  usuario: any;
  token: string | null;
  iniciarSesion: (token: string, datosUsuario: any) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

// Crear contexto
export const ContextoAuth = createContext<TipoContextoAuth | undefined>(undefined);

// Proveedor
export const ProveedorAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar datos guardados localmente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem("token");
        const usuarioGuardado = await AsyncStorage.getItem("usuario");

        if (tokenGuardado && usuarioGuardado) {
          setToken(tokenGuardado);
          setUsuario(JSON.parse(usuarioGuardado));
        }
      } catch (error) {
        console.log("Error cargando datos de sesión:", error);
      }
    };

    cargarDatos();
  }, []);

  // Guardar datos al iniciar sesión
  const iniciarSesion = async (token: string, datosUsuario: any) => {
    setToken(token);
    setUsuario(datosUsuario);

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  // Eliminar datos de sesión
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("usuario");

    setToken(null);
    setUsuario(null);
  };

  return (
    <ContextoAuth.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un ProveedorAuth");
  }
  return contexto;
};
