import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { authApi } from "../utils/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (user: User) => void;
  isAuthenticated: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const supabase = createClient();

  // Load user from session on mount
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAccessToken(session.access_token);
        sessionStorage.setItem("annual_session", JSON.stringify({
          access_token: session.access_token,
        }));
        
        // Get user profile from server
        try {
          const { user: userProfile } = await authApi.getProfile();
          setUser({
            id: userProfile.id,
            name: userProfile.user_metadata?.name || "User",
            email: userProfile.email!,
            role: "User",
          });
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return false;
      }

      if (data.session) {
        setAccessToken(data.session.access_token);
        sessionStorage.setItem("annual_session", JSON.stringify({
          access_token: data.session.access_token,
        }));

        // Get user profile
        try {
          const { user: userProfile } = await authApi.getProfile();
          setUser({
            id: userProfile.id,
            name: userProfile.user_metadata?.name || "User",
            email: userProfile.email!,
            role: "User",
          });
        } catch (profileError) {
          console.error("Error fetching profile:", profileError);
          // Still set basic user info from session
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.name || "User",
            email: data.user.email!,
            role: "User",
          });
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authApi.signup(email, password, name);

      if (response.error) {
        console.error("Registration error:", response.error);
        return false;
      }

      if (!response.user) {
        console.error("No user returned from signup");
        return false;
      }

      // Auto login after registration
      const loginSuccess = await login(email, password);
      return loginSuccess;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAccessToken(null);
    sessionStorage.removeItem("annual_session");
  };

  const updateProfile = async (updatedUser: User) => {
    try {
      await authApi.updateProfile(updatedUser.name);
      setUser(updatedUser);
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
