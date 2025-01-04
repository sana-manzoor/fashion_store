import React from "react";


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(sessionStorage.getItem("token")); // Check authentication

  return isAuthenticated ? children : <Navigate to="/log" replace />;
};

export default ProtectedRoute;