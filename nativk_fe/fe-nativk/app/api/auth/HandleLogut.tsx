import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function HandleLogout() {
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
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="p-3 bg-blue-700 rounded-4xl text-white w-full mt-5 hover:bg-blue-600 cursor-pointer"
    >
      Cerrar Sesion
    </button>
  );
}
