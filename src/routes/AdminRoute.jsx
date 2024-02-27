/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/UseRole";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { role } = useRole();
  console.log(role);
  if (role == "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
