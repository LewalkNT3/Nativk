import axios from "axios";

// Define the Exercise type
interface Exercise {
  id: number;
  name: string;
  description: string;
  // Add other properties as needed
}

export const getExampleExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/exercises/exercises/"
    );
    console.log(response.data.results); // Mueve el console.log fuera del return
    return response.data.results; // Asegúrate de devolver solo la lista de ejercicios
  } catch (err: any) {
    console.error(
      "Error al obtener ejercicios:",
      err.response?.data || err.message
    );
    throw new Error("Error al obtener ejercicios");
  }
};
