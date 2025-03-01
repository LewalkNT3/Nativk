import api from "../api";

export const getBoards = async () => {
  const response = await api.get("/tasks_manager/boards/");
  return response.data;
};

interface Board {
    id: string;
    name: string;
}

interface Column {
    id: string;
    board: string;
    name: string;
    position: number;
}

interface Task {
    id: string;
    column: string;
    title: string;
    description: string;
    priority: string;
}

export const createBoard = async (name: string): Promise<Board> => {
    const response = await api.post<Board>("/tasks_manager/boards/", { name });
    return response.data;
}

export const getColumns = async (boardId: any) => {
    const response = await api.get(`/columns/?board=${boardId}`)
    return response.data
}

export const createColumn = async (boardId: any, name: any, position: any) => {
    const response = await api.post(`/columns/`, {board: boardId, name, position})
    return response.data
}

export const getTasks = async (columnId: any) => {
    const response = await api.get(`/tasks/?column=${columnId}`);
    return response.data
}

export const createTask = async (columnId: any, title: any, description: any, priority: any) => {
    const response = await api.post(`/tasks/`,{ column: columnId, title, description, priority });
    return response.data
}
