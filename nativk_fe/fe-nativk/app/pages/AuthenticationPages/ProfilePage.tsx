import axios from "axios";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No hay token disponible en localStorage.");
        setError("No hay token disponible");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setUser(response.data);
        setFormData(response.data); // Inicializamos formData con los datos del usuario
      } catch (err: any) {
        setError("Error al recibir los datos");
        console.error("Error de Axios:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos actualizados al backend
  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("No hay token disponible");
      return;
    }

    try {
      await axios.patch(
        "http://localhost:8000/api/auth/profile/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser(formData); // Actualizamos la vista con los datos nuevos
      alert("Perfil actualizado correctamente");
    } catch (err: any) {
      setError("Error al actualizar los datos");
      console.error("Error al actualizar:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

      <label className="block mb-2">
        <span className="text-gray-700 ">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-400 text-white"
          disabled
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Usuario:</span>
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-400 text-white"
          disabled
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Nombre:</span>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Apellido:</span>
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">DNI:</span>
        <input
          type="text"
          name="dni"
          value={formData.dni || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Teléfono:</span>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Guardar cambios
      </button>
    </section>
  );
}
