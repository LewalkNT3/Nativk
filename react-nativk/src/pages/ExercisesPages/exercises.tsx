import { getExampleExercises } from "../../../services/Exercises/ExampleExercises";
import { useEffect, useState } from "react";

interface Exercise {
  id: string;
  name: string;
  description: string;
}

export default function ExercisesPage() {
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExampleExercises();
        setExercisesList(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center w-[850px]">
      <div className="self-start w-full mb-5 flex flex-col gap-1">
        <h1 className="text-7xl self-start font-semibold w-[340px]">
          Ejercicios
        </h1>
        <p className="text-gray-500 text-balance">
          En esta página, puedes ver todos los ejercicios creados, agregar
          nuevos ejercicios y guardar o editar los resultados para futuras
          referencias.
        </p>
        <div className="flex flex-row items-center gap-3 text-sky-400">
          <a href="measurements/create" className="hover:text-sky-700">
            Crear un nuevo ejercicio
          </a>
          <div className="bg-gray-500 w-[5px] h-[1px]"></div>
          <a href="" className="hover:text-sky-700">
            Calendario
          </a>
        </div>
        <div>
          {Array.isArray(exercisesList) ? (
            exercisesList.map((exercise) => (
              <div key={exercise.id} className="flex flex-row gap-3">
                <div>
                  <p>{exercise.name}</p>
                  <p>{exercise.description}</p>
                </div>
                <div>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron ejercicios.</p>
          )}
        </div>
      </div>
    </div>
  );
}
