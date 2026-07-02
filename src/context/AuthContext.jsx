import { createContext, useContext } from "react";
import usersData from "../data/users.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("cc_session", null);

  function login(username, password) {
    const found = usersData.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Usuario o contraseña incorrectos." };
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
