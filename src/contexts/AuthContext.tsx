import { createContext } from 'react';

export interface LoginData {
  username: string;
  token: string;
}

const AuthContext = createContext({
  authData: {} as LoginData,
  login: (data: LoginData) => {},
  logout: () => {},
});

export { AuthContext };
