import axios from "axios";

let token = localStorage.getItem("access_token");

export const updateProfile = async (formData: any) => {
  try {
    await axios.patch(
      "http://localhost:8000/api/auth/profile/update/",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err: any) {
    console.error("Error al actualizar:", err.response?.data || err.message);
    throw new Error("Error al actualizar el perfil");
  }
};
