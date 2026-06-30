import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  function login(credentials) {
    const loggedUser = authService.login(credentials);
    setUser(loggedUser);
    return loggedUser;
  }

  function register(data) {
    const registeredUser = authService.register(data);
    setUser(registeredUser);
    return registeredUser;
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  function updateProfile(updates) {
    const updatedUser = authService.updateUser(updates);
    setUser(updatedUser);
    return updatedUser;
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateProfile,
    }),
    [user],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
