import Recat, {createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//tipos de datos del contexto
interface TipoContextoAuth{
    usuario:any;
    token: string | null;
    iniciarSesion: (token:string, datosUsuario:any) => Promise<void>;
    cerrarSesion:()=>Promise<void>;
}

const ContextoAuth = createContext<TipoContextoAuth | undefined>(undefined);

export const ProveedorAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  //cargar datos guardados local
  useEffect(() => {
    const cargarDatosAuth = async () => {
      const tokenGuardado = await AsyncStorage.getItem("token");
      const usuarioGuardado = await AsyncStorage.getItem("usuario");
      if (tokenGuardado && usuarioGuardado) {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(usuarioGuardado));
      }
    };
    cargarDatosAuth();
  }, []);

  //guardar datos de login
  const iniciarSesion = async (token: string, datosUsuario: any) => {
    setToken(token);
    setUsuario(datosUsuario);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  //eliminar datos cuando se cierra sesion
  const cerrarSesion = async () => {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("usuario");
  };

  return (
    <ContextoAuth.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  );
};

//hook para usr el contexto
export const usrAuth = () => {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error("Errorrr");
  }
  return contexto;
};