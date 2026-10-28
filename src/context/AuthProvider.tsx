import React, { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import useAxiosBase from "../hooks/useAxios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosBase();

  // admin login
  const adminLogin = async (email: any, password: any) => {
    try {
      setLoading(true);

      const res = await axiosSecure.post("/auth/sign-in", { email, password });

      const { accessToken } = res.data.data;

      localStorage.setItem("token", accessToken);

      setToken(accessToken);

      const response = await axiosSecure.get("/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response?.data?.data);
      setLoading(false);
      return res.data;
    } catch (error: any) {
      setLoading(false);
      throw error.response?.data?.message || "Login failed. Please try again.";
    }
  };

  useEffect(() => {
    setLoading(true);
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axiosSecure
        .get("/users/profile", {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        .then((res) => {
          setLoading(true);
          setUser(res.data.data);
        })
        .catch(() => logout())
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // admin logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // replace the stored token, e.g. after a password change revokes the old one
  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const userInfo = {
    user,
    setUser,
    token,
    setToken: updateToken,
    adminLogin,
    logout,
    setLoading,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}
