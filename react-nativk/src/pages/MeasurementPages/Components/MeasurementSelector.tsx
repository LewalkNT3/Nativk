import { useState, useEffect } from "react";

const MeasurementSelector = ({
  placeholder,
  value,
  onChange,
  isWeight,
  isFlag,
}: {
  name: string;
  placeholder: string;
  value: number | boolean;
  onChange: (value: number | boolean) => void;
  isWeight: boolean;
  isFlag: boolean;
}) => {
  const [selected, setSelected] = useState<number | boolean>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: number | boolean = isFlag
      ? e.target.checked
      : parseInt(e.target.value);
    if (!isFlag && isNaN(newValue as number)) newValue = 0;
    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="block mb-2 text-xl font-medium self-start text-gray-900 ">
        {placeholder}
      </span>
      {isFlag ? (
        <div className="w-full">
          <div className="flex items-center py-4 p-2 border border-red-200 rounded-lg dark:border-gray-300 ">
            <input
              type="checkbox"
              onChange={handleSelect}
              id="bordered-checkbox-2"
              value="flags"
              name="bordered-checkbox"
              className="w-6 h-6 bg-gray-600 rounded-sm focus:ring-blue-500   "
            />
            <label
              htmlFor="bordered-checkbox-2"
              className="w-full  ms-2 text-sm font-medium text-gray-200 dark:text-gray-600"
            >
              Flagged
            </label>
          </div>
        </div>
      ) : isWeight ? (
        <div className="w-full">
          <input
            type="number"
            min="1"
            max="500"
            value={typeof selected === "number" ? selected : 0}
            onChange={handleSelect}
            className="w-full py-4 p-2 border border-gray-300 rounded-lg text-center"
          />
        </div>
      ) : (
        <>
          <input
            type="range"
            min="1"
            max="10"
            value={typeof selected === "number" ? selected : 0}
            onChange={handleSelect}
            className="flex justify-center items-center w-full h-[2px] cursor-pointer"
          />

          <div className="flex flex-row justify-between w-full p-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 pr-[10px] start-0 -bottom-6">
              0
            </span>
            <div>
              <span className="text-2xl font-bold">{selected}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">
              10
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MeasurementSelector;
