import { Navigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authAPI.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login page with the original path as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
