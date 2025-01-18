import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Properties from '../pages/Properties';
import PropertyDetails from '../pages/PropertyDetails';
import UpdateProfile from '../pages/UpdateProfile';
import Layout from '../components/Layout';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './authProvider';

const AppRoute=()=> {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
            <Route path="profile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoute;