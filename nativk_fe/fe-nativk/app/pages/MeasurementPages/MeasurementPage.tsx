import React, { use } from "react";
import { useState, useEffect } from "react";
import {
  getMeasurement,
  createMeasurement,
  deleteMeasurement,
} from "~/api/measurement/measurementService";

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
    weight: "",
    sleep: "",
    body_pain: "",
    energy: "",
    emotional_state: "",
    frustration: "",
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
      console.error("error obteniendo mediciones2", error);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createMeasurement(form);
      fetchMeasurements();
      setForm({
        weight: "",
        sleep: "",
        body_pain: "",
        energy: "",
        emotional_state: "",
        frustration: "",
        flags: false,
      });
    } catch (error) {
      console.error("error creando la medicion", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteMeasurement(id);
      fetchMeasurements();
    } catch (error) {
      console.error("error elimnando la medicion", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Mediciones</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="weight"
            placeholder="Peso"
            value={form.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="sleep"
            placeholder="Horas de Sueño"
            value={form.sleep}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="body_pain"
            placeholder="Dolor Corporal"
            value={form.body_pain}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="energy"
            placeholder="Energía"
            value={form.energy}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="emotional_state"
            placeholder="Estado Emocional"
            value={form.emotional_state}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="frustration"
            placeholder="Frustración"
            value={form.frustration}
            onChange={handleChange}
            required
          />
          <button type="submit">Guardar</button>
        </form>
        <ul>
          {measurement.map((m) => (
            <li key={m.id}>
              {m.date} - Peso: {m.weight} kg - Energía: {m.energy}
              <button onClick={() => handleDelete(m.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
