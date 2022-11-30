import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const [auth] = useContext(AuthContext);
  if (!auth) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
