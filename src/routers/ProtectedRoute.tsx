import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authData } = useAuth();
  if (!authData) {
    return <Navigate to="/" />;
  }
  return children;
};
