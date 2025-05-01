import { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  role: "buyer" | "seller" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (role: User["role"]) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: User["role"]) => {
    setUser({ id: "123", name: "George", role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
