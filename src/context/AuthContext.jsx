import { createContext, useContext, useMemo, useState } from "react";
import { readJson } from "../lib/storage";

const AuthContext = createContext(null);
const USERS_KEY = "velune-users";
const SESSION_KEY = "velune-user";

const demoUser = {
  name: "Alex Rivera",
  email: "demo@velune.com",
  password: "listen123",
};

function readUsers() {
  const stored = readJson(USERS_KEY, []);
  if (!Array.isArray(stored) || stored.length === 0) {
    localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
    return [demoUser];
  }
  return stored;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = readJson(SESSION_KEY, null);
    if (session && typeof session.email === "string" && typeof session.name === "string") {
      return session;
    }
    return null;
  });

  const signup = ({ name, email, password }) => {
    const users = readUsers();
    const exists = users.some((entry) => entry.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const next = [...users, { name: name.trim(), email: email.trim(), password }];
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    const session = { name: name.trim(), email: email.trim() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = readUsers();
    const found = users.find(
      (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password,
    );
    if (!found) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    const session = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, signup, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
