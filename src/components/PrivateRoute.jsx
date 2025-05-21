import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwt");
  return token ? children : <Navigate to="/" />;
}