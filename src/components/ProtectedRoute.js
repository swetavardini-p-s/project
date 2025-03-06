import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, component: Component }) => {
  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;