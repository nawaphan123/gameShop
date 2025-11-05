import { Navigate } from "react-router-dom";

import React from "react";

export const ProtectedBypass = ({ children }) => {
  const isLogin = localStorage.getItem("logInState");
  if (isLogin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
