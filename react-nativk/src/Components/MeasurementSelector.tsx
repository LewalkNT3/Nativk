import { useState, useEffect } from "react";

const MeasurementSelector = ({
  placeholder,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const [selected, setSelected] = useState<number>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="block mb-2 text-xl font-medium self-start text-gray-900 ">
        {placeholder}
      </span>
      <input
        type="range"
        min="1"
        max="10"
        value={selected}
        onChange={handleSelect}
        className="flex justify-center items-center w-full h-[2px] cursor-pointer"
      />
      <div className="flex flex-row justify-between w-full p-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 pr-[10px]  start-0 -bottom-6">
          0
        </span>
        <div>
          <span className="text-2xl font-bold">{selected}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">
          10
        </span>
      </div>
    </div>
  );
};

export default MeasurementSelector;
