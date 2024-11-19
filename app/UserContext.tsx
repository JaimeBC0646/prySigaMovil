import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);
