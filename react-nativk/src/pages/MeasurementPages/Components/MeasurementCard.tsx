import { Flag } from "@deemlol/next-icons";
import { Trash2 } from "@deemlol/next-icons";
import { useState } from "react";

interface Measurement {
  id: any;
  date: string;
  sleep: number;
  body_pain: number;
  emotional_state: number;
  frustration: number;
  weight: number;
  energy: number;
  flags: boolean;
}

interface MeasurementCardProps {
  measurement: Measurement;
  onDelete: (id: any) => void;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({
  measurement,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(measurement.id);
    setIsOpen(false);
  };
  return (
    <div>
      <li className="flex flex-col p-4 border border-gray-300 rounded-xl">
        <div className="flex justify-between  items-center">
          <h1 className="text-xl font-bold">
            {new Date(measurement.date).toLocaleDateString("en-GB")}
          </h1>
          <div className="flex flex-row justify-center items-ceneter">
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer hover:bg-gray-300 hover:rounded-xl p-1"
            >
              <Trash2 size={22} />
            </button>
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold">¿Estás seguro?</h2>
                  <p className="text-gray-600">
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex justify-end mt-4 gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {measurement.flags && (
              <button className="p-1">
                <Flag size={22} color="#e7000b" />
              </button>
            )}
            {/* <button className="cursor-pointer hover:bg-gray-300 hover:rounded-xl p-1">
              <Edit2 size={22} />
            </button> */}
          </div>
        </div>
        <div className="w-full h-[2px] rounded-4xl bg-blue-700 my-2"></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Peso:</span>
          <p className="text-2xl">{measurement.weight} kg</p>
        </div>
        <div className="w-full h-[1px] rounded-4xl bg-gray-300 "></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Energia:</span>
          <p className="text-2xl">{measurement.energy}</p>
        </div>
        <div className="w-full h-[1px] rounded-4xl bg-gray-300 "></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Dormir:</span>
          <p className="text-2xl">{measurement.sleep}</p>
        </div>
        <div className="w-full h-[1px] rounded-4xl bg-gray-300 "></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Estado Emocional:</span>
          <p className="text-2xl">{measurement.emotional_state}</p>
        </div>
        <div className="w-full h-[1px] rounded-4xl bg-gray-300 "></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Frustracion:</span>
          <p className="text-2xl">{measurement.frustration}</p>
        </div>
        <div className="w-full h-[1px] rounded-4xl bg-gray-300 "></div>
        <div className="flex flex-row gap-2 items-center p-2 justify-center">
          <span className="text-xl">Dolor de panza:</span>
          <p className="text-2xl">{measurement.body_pain}</p>
        </div>
      </li>
    </div>
  );
};

export default MeasurementCard;
