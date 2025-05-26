import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import type {TaskType} from '../types/task-type.ts';
import {
  addTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  subscribeToBoardSettings,
  subscribeToTasks,
} from '../services/taskService.ts';
import type {BoardType} from '../types/board-type.ts';

type TaskContextType = {
  tasks: TaskType[];
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
  addTask: (task: Omit<TaskType, 'id' | 'completedStatus'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (task: TaskType) => Promise<void>;
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (isAddTaskOpen: boolean) => void;
  isEditTaskOpen: boolean;
  setIsEditTaskOpen: (isEditTaskOpen: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);


const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data: TaskType[]) => {
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToBoardSettings((boards: BoardType[]) => {
      if (boards.length > 0) {
        setShowCompleted(boards[0].completedStatus);
      }
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (newTask: Omit<TaskType, 'id' | 'completedStatus'>) => {
    await addTaskRequest(newTask);
  }

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskRequest(id);
    } catch (error) {
      console.error('Failed to delete task-item-from-edit:', error);
      throw error;
    }
  }

  const updateTask = async (task: TaskType) => {
    try {
      const updatedTask = { ...task };
      await updateTaskRequest(updatedTask);
    } catch (error) {
      console.error('Failed to update task-item-from-edit:', error);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        showCompleted,
        setShowCompleted,
        addTask,
        deleteTask,
        updateTask,
        isAddTaskOpen,
        setIsAddTaskOpen,
        isEditTaskOpen,
        setIsEditTaskOpen
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if(!context){
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
