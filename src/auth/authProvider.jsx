import React, { createContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider=({ children })=> {
      const [user, setUser] = useState(() => {
        // Initialize user state from localStorage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
      });

      const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
      };

      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}


export default AuthProvider