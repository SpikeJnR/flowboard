export type TaskType = {
  id: string;
  title: string;
  description?: string;
  boardType: string;
  completedStatus: boolean;
  deadline?: Date | null;
  priority: number;
};
