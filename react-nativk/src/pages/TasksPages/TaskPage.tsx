import { useBoards, useCreateBoard } from "../../../services/queries";
import { useState } from "react";

interface Board {
  id: string;
  name: string;
}

export default function TaskPage() {
  const { data: boards, isLoading } = useBoards();
  const createBoard = useCreateBoard();
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreateBoard = () => {
    createBoard.mutate(newBoardName);
    setNewBoardName("");
  };

  if (isLoading) return <p>Cargando tableros...</p>;

  return (
    <div className="h-screen">
      <h1 className="text-3xl font-bold">Mis Tableros</h1>
      <ul className="px-3">
        {boards?.map((board: Board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newBoardName}
        onChange={(e) => setNewBoardName(e.target.value)}
        placeholder="Nuevo tablero"
      />
      <button onClick={handleCreateBoard}>Crear</button>
    </div>
  );
}
