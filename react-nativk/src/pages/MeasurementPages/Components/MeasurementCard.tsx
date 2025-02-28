import { Flag } from "@deemlol/next-icons";
import { Trash2 } from "@deemlol/next-icons";
// import { Edit2 } from "@deemlol/next-icons";

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
  return (
    <div>
      <li className="flex flex-col p-4 border border-gray-300 rounded-xl">
        <div className="flex justify-between  items-center">
          <h1 className="text-xl font-bold">
            {new Date(measurement.date).toLocaleDateString("en-GB")}
          </h1>
          <div className="flex flex-row justify-center items-ceneter">
            <button
              onClick={() => onDelete(measurement.id)}
              className="cursor-pointer hover:bg-gray-300 hover:rounded-xl p-1"
            >
              <Trash2 size={22} />
            </button>
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
