import {useEffect, useState} from 'react';
import type {TaskType} from '../../types/task-type';
import TaskForm from '../../components/tasks/task-form';
import {
  addTask,
  deleteTask,
  subscribeToBoardSettings,
  subscribeToTasks,
  updateTask
} from '../../services/taskService.ts';
import TaskFormEdit from '../../components/tasks/task-from-edit';
import {BoardCategory} from '../../utils/const.ts';
import type {BoardType} from '../../types/board-type';
import BoardsControl from '../../components/boards-control';
import BoardHeader from '../../components/board-header';
import TaskItem from '../../components/tasks/task-item';

const BoardsScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedBoardType, setSelectedBoardType] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

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

  const addCard = async (newTask: Omit<TaskType, 'id' | 'completedStatus'>) => {
    const task: Omit<TaskType, 'id' | 'completedStatus'> = {
      ...newTask,
    };
    await addTask(task);
  }

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task-item-from-edit:', error);
      throw error;
    }
  }

  const updateTaskElement = async (task: TaskType) => {
    try {
      const updatedTask = { ...task };
      await updateTask(updatedTask);
    } catch (error) {
      console.error('Failed to update task-item-from-edit:', error);
    }
  }

  return (
    <div className='boards'>
      <section className='boards__container'>
        <div className='edit-task-form'>
          {
            isEditTaskOpen && selectedTask ? (
              <TaskFormEdit
                task={selectedTask}
                removeTask={removeTask}
                onClose={() => setIsEditTaskOpen(false)}
                updateTask={updateTaskElement}
              />
            ) : null
          }
        </div>

        <BoardsControl showCompleted={showCompleted} setShowCompleted={setShowCompleted} />

        <div className='boards__wrapper'>
          {
            Object.values(BoardCategory).map((board) => (
              <div className={`boards__${board} board`} key={board}>

                <BoardHeader board={board} setIsAddTaskOpen={setIsAddTaskOpen} setSelectedBoardType={setSelectedBoardType}/>

                <div className='task__list'>
                  <TaskItem
                    tasks={tasks}
                    board={board}
                    showCompleted={showCompleted}
                    updateTaskElement={updateTaskElement}
                    setIsEditTaskOpen={setIsEditTaskOpen}
                    setSelectedTask={setSelectedTask}
                  />
                </div>
                <div className='board__edit-form'>
                  {
                    isAddTaskOpen &&
                    selectedBoardType === board && (
                    <TaskForm
                      addTaskForm={addCard}
                      status={board}
                      onClose={() => setIsAddTaskOpen(false)}
                    />
                  )}
                </div>
              </div>
            ))
          }

        </div>
      </section>
    </div>
  );
}

export default BoardsScreen;
