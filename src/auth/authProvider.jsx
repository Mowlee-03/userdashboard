import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider=({ children })=> {
      const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
      });

      const login = (userData) => {
        const decodeuser=jwtDecode(userData)
        localStorage.setItem('user', JSON.stringify(decodeuser));
        setUser(decodeuser)
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