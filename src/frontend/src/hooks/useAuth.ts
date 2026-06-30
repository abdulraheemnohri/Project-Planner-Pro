import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          const user: User = JSON.parse(userData);
          setAuth({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuth({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuth({
          user: data.user,
          token: data.access_token,
          isAuthenticated: true,
          isLoading: false,
        });
        toast.success("Logged in successfully!");
        return true;
      } else {
        toast.error(data.detail || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred");
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, full_name: username }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created! Please sign in.");
        return true;
      } else {
        toast.error(data.detail || "Registration failed");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return {
    ...auth,
    login,
    register,
    logout,
  };
}