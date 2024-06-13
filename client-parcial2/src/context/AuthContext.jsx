import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:8080/api/auth/whoami', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el rol del usuario');
        }
        const data = await response.json();
        const userRole = data.data[0].authority;
        setUserRole(userRole);
        localStorage.setItem('userRole', userRole); // Guardar rol en localStorage
      } catch (error) {
        console.error('Error al cargar el rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, [token]);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, updateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
