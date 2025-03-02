import { useState } from "react";
import { createMeasurement } from "../../../services/Measurement/measurement";
import { useNavigate } from "react-router-dom";

import MeasurementSelector from "./Components/MeasurementSelector";

export default function MeasurementPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    weight: 0,
    sleep: 0,
    body_pain: 0,
    energy: 0,
    emotional_state: 0,
    frustration: 0,
    flags: false,
  });

  const handleChange = (name: string, value: number | boolean) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/measurements");

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

  return (
    <div className="min-h-screen flex flex-col  items-center w-[550px]">
      <div className="self-start w-full mb-5 flex flex-col gap-1">
        <h1 className="text-7xl self-start font-semibold">Crear Mediciones</h1>
        <p className=" text-gray-500">
          En esta página, puedes realizar mediciones precisas y guardar los
          resultados para futuras referencias.
        </p>
        <div className="flex flex-row items-center gap-3 text-sky-400">
          <a href="/measurements" className="hover:text-sky-700">
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
          name="sleep"
          placeholder="Horas de Sueño"
          value={form.sleep}
          onChange={(value) => handleChange("sleep", value)}
          isWeight={false}
          isFlag={false}
        />
        <MeasurementSelector
          name="body_pain"
          placeholder="Dolor Corporal"
          value={form.body_pain}
          onChange={(value) => handleChange("body_pain", value)}
          isWeight={false}
          isFlag={false}
        />
        <MeasurementSelector
          name="energy"
          placeholder="Energía"
          value={form.energy}
          onChange={(value) => handleChange("energy", value)}
          isWeight={false}
          isFlag={false}
        />
        <MeasurementSelector
          name="emotional_state"
          placeholder="Estado Emocional"
          value={form.emotional_state}
          onChange={(value) => handleChange("emotional_state", value)}
          isWeight={false}
          isFlag={false}
        />
        <MeasurementSelector
          name="frustration"
          placeholder="Frustración"
          value={form.frustration}
          onChange={(value) => handleChange("frustration", value)}
          isWeight={false}
          isFlag={false}
        />
        <div className="grid grid-cols-2 justify-center gap-10 pb-3">
          <MeasurementSelector
            name="weight"
            placeholder="Peso"
            value={form.weight}
            onChange={(value) => handleChange("weight", value)}
            isWeight={true}
            isFlag={false}
          />
          <MeasurementSelector
            name="flags"
            placeholder="Flags"
            value={form.flags}
            onChange={(value) => handleChange("flags", value)}
            isWeight={false}
            isFlag={true}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onSubmit={handleSubmit}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
