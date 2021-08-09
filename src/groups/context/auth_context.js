import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: true,
  login: () => {},
  logout: () => {}
});