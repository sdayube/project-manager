import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { AuthContext, LoginData } from '../contexts/AuthContext';

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useLocalStorage('auth', null);
  const navigate = useNavigate();

  const login = (data: LoginData) => {
    console.log(data);
    setAuthData(data);
    navigate('/home');
  };

  const logout = () => {
    setAuthData(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      authData,
      login,
      logout,
    }),
    [authData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
