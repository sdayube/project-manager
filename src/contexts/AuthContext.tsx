import { createContext } from 'react';

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthData {
  username: string;
  token: string;
}

const AuthContext = createContext({
  authData: {} as AuthData,
  login: async (data: LoginData) => {},
  logout: () => {},
});

export { AuthContext };
