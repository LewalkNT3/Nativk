import axios from "axios";
import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      return null;
    }
  };

  const fetchUserData = async () => {
    let token = localStorage.getItem("access_token");

    if (!token) {
      token = await getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/profile/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        token = await getAccessToken();
        if (token) {
          return fetchUserData();
        }
      }
      console.error("Error al recibir los datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const authFetch = async (url: string, options: any) => {
    let token = localStorage.getItem("access_token");

    if (!token) {
      token = await getAccessToken();
      if (!token) {
        throw new Error("No access token available");
      }
    }

    try {
      const response = await axios(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err.response?.status === 401) {
        token = await getAccessToken();
        if (token) {
          return authFetch(url, options);
        }
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, loading, authFetch };
}
