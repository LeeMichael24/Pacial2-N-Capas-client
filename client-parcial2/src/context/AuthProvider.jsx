import { createContext, useState } from "react";

const AuthContext = createContext({});

// AuthProvider es un componente que envuelve a toda la aplicación y
// provee la información de autenticación a todos los componentes hijos que seria AuthProvider

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null, // Aca guardaremos la info del usuario.
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;