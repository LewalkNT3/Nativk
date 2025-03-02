import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        await axios.post(
          "http://localhost:8000/api/auth/logout/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error al cerrar la sesion", error);
      }
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Cesion cerrada correctamente");
    navigate("/login");
  };

  return { user, handleLogout };
};
