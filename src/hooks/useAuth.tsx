import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { useLocalStorage } from './useLocalStorage';
import { AuthContext, LoginData } from '../contexts/AuthContext';

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useLocalStorage('auth', null);
  const navigate = useNavigate();
  const toast = useToast();

  const login = async ({ username, password }: LoginData) => {
    await axios
      .post('http://localhost:3333/auth', {
        username,
        password,
      })
      .then((response) => {
        setAuthData({
          username,
          token: response.data.token,
        });
        navigate('/home');
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Erro',
            description:
              error.response?.status === 404
                ? 'Usuário não encontrado'
                : 'Usuário ou Senha incorreta',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
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
