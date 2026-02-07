import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextValue = {
  token: string | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "parikshe.token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bypassAuth = true;
    if (bypassAuth) {
      setToken("dev-token-bypass");
      setLoading(false);
      return;
    }
    AsyncStorage.getItem(STORAGE_KEY)
      .then(stored => {
        if (stored) {
          setToken(stored);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      loading,
      signIn: async newToken => {
        await AsyncStorage.setItem(STORAGE_KEY, newToken);
        setToken(newToken);
      },
      signOut: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setToken(null);
      },
      getToken: async () => AsyncStorage.getItem(STORAGE_KEY)
    }),
    [token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
