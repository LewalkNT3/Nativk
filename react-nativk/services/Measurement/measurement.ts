import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api_measurement = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api_measurement.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api_measurement;

export const getMeasurement = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/daily_measurement/daily_measurements/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error obteniendo mediciones");
    }

    const data = await response.json();

    // Asegurar que siempre se retorna un array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error obteniendo mediciones:", error);
    return []; // Retornar un array vacío en caso de error
  }
};

export const createMeasurement = async (data: any) => {
  try {
    const response = await api_measurement.post(
      "/api/daily_measurement/daily_measurements/",
      data
    );
    return response.data;
  } catch (error) {
    console.error("no se pudo crear el control", error);
    throw error;
  }
};

export const deleteMeasurement = async (id: any) => {
  try {
    await api_measurement.delete(
      `/api/daily_measurement/daily_measurements/${id}/`
    );
  } catch (error) {
    console.error("no se pudo eliminar el control", error);
    throw error;
  }
};
