import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoards, createBoard, getColumns, createColumn, getTasks, createTask } from "../services/Tasks/tasksService";

// OBTENER BOARDS
export const useBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
};

// CREAR BOARD
export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};

// OBTENER COLUMNAS DE UN BOARD
export const useColumns = (boardId?: string) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getColumns(boardId),
    enabled: !!boardId,
  });
};

// CREAR COLUMNA
export const useCreateColumn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { boardId: string; name: string; position: number }) =>
      createColumn(data.boardId, data.name, data.position),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};

// OBTENER TAREAS DE UNA COLUMNA
export const useTasks = (columnId?: string) => {
  return useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getTasks(columnId),
    enabled: !!columnId,
  });
};

// CREAR TAREA
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { columnId: string; title: string; description: string; priority: string }) =>
      createTask(data.columnId, data.title, data.description, data.priority),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.columnId] });
    },
  });
};
