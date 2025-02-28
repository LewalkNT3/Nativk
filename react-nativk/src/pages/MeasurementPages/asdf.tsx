export default function AllMeasuadsfrementsPage() {
  return (
    <div className="h-screen flex flex-col  items-center w-[550px]">
      <div className="self-start w-full mb-5 flex flex-col gap-1">
        <h1 className="text-7xl self-start font-semibold">
          Todas las Mediciones
        </h1>
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
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </div>
  );
}


