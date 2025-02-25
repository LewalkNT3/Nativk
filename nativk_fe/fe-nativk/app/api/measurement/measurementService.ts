import { data } from "react-router";
import api_measurement from "./measurement_api";

export const getMeasurement = async () => {
  try {
    const response = await api_measurement.get("/api/daily_measurement/");
    return response.data;
  } catch (error) {
    console.error("no se encontraron datos", error);
    throw error;
  }
};

export const createMeasurement = async (data: any) => {
  try {
    const response = await api_measurement.post(
      "/api/daily_measurement/",
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
    await api_measurement.delete(`/api/daily_measurement/${id}`);
  } catch (error) {
    console.error("no se pudo eliminar el control", error);
    throw error;
  }
};
