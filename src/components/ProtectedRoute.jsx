import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  return token ? children : <Navigate to="/login" replace state={{ from: location }} />;
}
