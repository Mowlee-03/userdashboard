import React, { useContext } from 'react'
import { AuthContext } from './authProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
     const { user } = useContext(AuthContext);
      
      if (!user) {
        return <Navigate to="/login" />;
      }
    
      return children;
}

export default PrivateRoute