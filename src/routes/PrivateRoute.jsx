/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
