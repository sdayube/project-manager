import { createContext } from 'react';

export interface LoginData {
  username: string;
  token: string;
}

const AuthContext = createContext({
  authData: null,
  login: (data: LoginData) => {},
  logout: () => {},
});

export { AuthContext };
