import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ element }) => {
  const login = localStorage.getItem("login");

  return login ? element : <Navigate to="/login" />;
};

export default PrivateRouter;
