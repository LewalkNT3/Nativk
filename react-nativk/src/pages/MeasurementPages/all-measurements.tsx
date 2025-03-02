import { useEffect, useState } from "react";
import {
  getMeasurement,
  deleteMeasurement,
} from "../../../services/Measurement/measurement";
import MeasurementCard from "./Components/MeasurementCard";

export default function AllMeasurementsPage() {
  interface Measurement {
    id: string;
    date: string;
    weight: number;
    sleep: number;
    body_pain: number;
    energy: number;
    emotional_state: number;
    frustration: number;
    flags: boolean;
  }

  const [measurement, setMeasurement] = useState<Measurement[]>([]);

  const fetchMeasurements = async () => {
    try {
      const data = await (
        await getMeasurement()
      ).map((m: any) => ({ ...m, id: m.id.toString() }));
      setMeasurement(data);
    } catch (error) {
      console.error("error obteniendo los datos", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMeasurement(id);
      console.log("");
      window.location.reload();
    } catch (error) {
      console.error("error al elimar la medicion", error);
    }
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  return (
    <div className="h-screen flex flex-col  items-center w-[850px]">
      <div className="self-start w-full mb-5 flex flex-col gap-1">
        <h1 className="text-7xl self-start font-semibold w-[340px]">
          Todas las Mediciones
        </h1>
        <p className=" text-gray-500 text-balance">
          En esta página, Podes ver todas las notas con las realizar mediciones
          precisas y guardar o editar los resultados para futuras referencias.
        </p>
        <div className="flex flex-row items-center gap-3 text-sky-400">
          <a href="measurements/create" className="hover:text-sky-700">
            Crear una nueva medicion
          </a>
          <div className="bg-gray-500 w-[5px] h-[1px]"></div>
          <a href="" className="hover:text-sky-700">
            Calendario
          </a>
        </div>
      </div>
      <div className="w-full">
        <ul className="grid grid-cols-3 grid-rows-3 w-full mt-6 space-y-2 gap-5">
          {measurement.map((m) => (
            <MeasurementCard
              key={m.id}
              measurement={m}
              onDelete={() => handleDelete(Number(m.id))}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
