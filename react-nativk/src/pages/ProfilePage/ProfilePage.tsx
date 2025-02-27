import { useState, useEffect } from "react";
import useAuth from "../../../services/Authentication/useAuth";
import { useLogout } from "../../../services/Authentication/useLogout";
import { updateProfile } from "../../../services/Profile/updateProfile";

export default function ProfilePage() {
  const { user, authFetch } = useAuth();
  const { handleLogout } = useLogout();
  const [formData, setFormData] = useState<any>({});
  const [initialData, setInitialData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await updateProfile(formData);
      setInitialData(formData);
      alert("Perfil actualizado correctamente");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
      setInitialData(user);
      setLoading(false);
    }
  }, [user]);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const isFormModified =
    JSON.stringify(formData) !== JSON.stringify(initialData);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4 max-w-md mx-auto">
      <h2 className="text-5xl font-bold mb-4">Mi perfil</h2>

      <div className="flex flex-row gap-4 items-center py-10">
        <div className="inline-flex items-center justify-center w-18 h-18 text-xl text-white bg-indigo-500 rounded-full">
          {getInitials(user.first_name, user.last_name)}
        </div>
        <div>
          <h3 className="uppercase font-bold text-3xl">{user.username}</h3>
          <p className="font-light text-gray-600">{user.email}</p>
        </div>
      </div>
      <label className="block mb-2">
        <span className="text-gray-700">Nombre:</span>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded p-4"
          placeholder="Nombre"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Apellido:</span>
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded p-4"
          placeholder="Apellido"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Teléfono:</span>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded p-4"
          placeholder="Teléfono (opcional)"
        />
      </label>

      <div className="flex flex-row w-full justify-center items-center gap-3">
        <button
          onClick={handleSubmit}
          className={`p-3 rounded-4xl text-white w-[250px] mt-5 cursor-pointer ${
            isFormModified
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormModified}
        >
          Guardar cambios
        </button>
        <button
          onClick={handleLogout}
          className="p-3 bg-red-700 rounded-4xl text-white w-[250px] mt-5 hover:bg-red-600 cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </section>
  );
}
