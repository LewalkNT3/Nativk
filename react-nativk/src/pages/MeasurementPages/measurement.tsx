import { useState, useEffect } from "react";
import {
  getMeasurement,
  createMeasurement,
  deleteMeasurement,
} from "../../../services/Measurement/measurement";

import MeasurementSelector from "../../Components/MeasurementSelector";

export default function MeasurementPage() {
  interface Measurement {
    id: number;
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
  const [form, setForm] = useState({
    weight: 0,
    sleep: 0,
    body_pain: 0,
    energy: 0,
    emotional_state: 0,
    frustration: 0,
    flags: false,
  });

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    try {
      const data = await getMeasurement();
      setMeasurement(data);
    } catch (error) {
      console.error("Error obteniendo mediciones", error);
    }
  };

  const handleChange = (name: string, value: number) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Asegurar que los valores sean numéricos antes de enviarlos
    const formattedForm = {
      ...form,
      weight: parseFloat(form.weight.toString()) || 0,
      sleep: parseInt(form.sleep.toString()) || 0,
      body_pain: parseInt(form.body_pain.toString()) || 0,
      energy: parseInt(form.energy.toString()) || 0,
      emotional_state: parseInt(form.emotional_state.toString()) || 0,
      frustration: parseInt(form.frustration.toString()) || 0,
    };

    try {
      await createMeasurement(formattedForm);
      fetchMeasurements();
      setForm({
        weight: 0,
        sleep: 0,
        body_pain: 0,
        energy: 0,
        emotional_state: 0,
        frustration: 0,
        flags: false,
      });
    } catch (error) {
      console.error("Error creando la medición", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMeasurement(id);
      fetchMeasurements();
    } catch (error) {
      console.error("Error eliminando la medición", error);
    }
  };

  return (
    <div className="h-screen flex flex-col  items-center w-[550px]">
      <div className="self-start w-full mb-5 flex flex-col gap-1">
        <h1 className="text-7xl self-start font-semibold">Mediciones</h1>
        <p className=" text-gray-500">
          En esta página, puedes realizar mediciones precisas y guardar los
          resultados para futuras referencias.
        </p>
        <div className="flex flex-row items-center gap-3 text-sky-400">
          <a href="measurement/all-measurement" className="hover:text-sky-700">
            Ver todas las notas
          </a>
          <div className="bg-gray-500 w-[5px] h-[1px]"></div>
          <a href="" className="hover:text-sky-700">
            Calendario
          </a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
        <MeasurementSelector
          name="weight"
          placeholder="Peso"
          value={form.weight}
          onChange={(value) => handleChange("weight", value)}
        />
        <MeasurementSelector
          name="sleep"
          placeholder="Horas de Sueño"
          value={form.sleep}
          onChange={(value) => handleChange("sleep", value)}
        />
        <MeasurementSelector
          name="body_pain"
          placeholder="Dolor Corporal"
          value={form.body_pain}
          onChange={(value) => handleChange("body_pain", value)}
        />
        <MeasurementSelector
          name="energy"
          placeholder="Energía"
          value={form.energy}
          onChange={(value) => handleChange("energy", value)}
        />
        <MeasurementSelector
          name="emotional_state"
          placeholder="Estado Emocional"
          value={form.emotional_state}
          onChange={(value) => handleChange("emotional_state", value)}
        />
        <MeasurementSelector
          name="frustration"
          placeholder="Frustración"
          value={form.frustration}
          onChange={(value) => handleChange("frustration", value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>

      {/* <ul className="mt-6 space-y-2">
        {measurement.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span>
              {m.date} - Peso: {m.weight} kg - Energía: {m.energy}
            </span>
            <button
              onClick={() => handleDelete(m.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
