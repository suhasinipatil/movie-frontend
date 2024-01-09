import React, { useState, createContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: '',
    loggedIn: false,
    username: '',
    id: '',
  });

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    //console.log(userData);
  };

  const handleUnsetUser = () => {
    setUser({
      token: '',
      loggedIn: false,
      username: '',
      id: '',
    });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const handleLoad = () => {
      // Check if the token exists in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        handleUnsetUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };