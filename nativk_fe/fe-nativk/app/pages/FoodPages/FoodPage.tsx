import React, { useState } from "react";

export default function FoodPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className="h-screen flex justify-center items-center relative"
      onClick={handleCloseModal}
    >
      <div className="flex flex-row gap-1">
        {[
          "Desayuno",
          "Media Mañana",
          "Almuerzo",
          "Merienda",
          "Cena",
          "Snacks",
        ].map((meal, index) => (
          <div
            key={index}
            className="flex flex-col h-[200px] w-[180px] shadow-md cursor-pointer"
          >
            <div className="sticky top-0 bg-blue-800">
              <p className="p-1 text-white">{meal}</p>
            </div>
            <div onClick={handleOpenModal}>
              <p className="text-gray-400 self-center p-3">
                Clickea para añadir una nueva comida
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Añadir Comida</h2>
            <p className="text-gray-600">
              Aquí puedes agregar una nueva comida.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
