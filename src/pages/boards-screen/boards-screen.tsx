import {useEffect, useState} from 'react';
import type {TaskType} from '../../types/task-type';
import TaskForm from '../../components/task-form';
import {addTask, deleteTask, subscribeToTasks, updateTask} from '../../services/taskService.ts';
import TaskFormEdit from '../../components/task-from-edit';
import {BoardType} from '../../utils/const.ts';

const BoardsScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedBoardType, setSelectedBoardType] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data: TaskType[]) => {
      setTasks(data);
    });

    return () => unsubscribe(); // Отписка при размонтировании
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
      console.error('Failed to delete task-from-edit:', error);
      throw error;
    }
  }

  const updateTaskElement = async (task: TaskType) => {
    try {
      const updatedTask = { ...task };
      await updateTask(updatedTask);
    } catch (error) {
      console.error('Failed to update task-from-edit:', error);
    }
  }

  const getChecked = (task: TaskType) => {
    task.completedStatus = !task.completedStatus;
    updateTaskElement(task);
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
        <div className='boards__control'></div>
        <div className='boards__wrapper'>
          {
            Object.values(BoardType).map((board) => (
              <div className={`boards__${board} board`} key={board}>
                <div className='board__header'>
                  <h2 className='board__title'>{board}</h2>
                  <button
                    className='board__button'
                    name={board}
                    onClick={(evt) => {
                      setIsAddTaskOpen(true);
                      setSelectedBoardType(evt.currentTarget.getAttribute('name'));
                    }}
                  ></button>
                </div>
                <div className='card__list'>
                  {tasks
                    .filter(task => task.boardType === board)
                    .map(task => (
                      <div className='task' key={task.id}>
                        <button className={`task__button ${task.completedStatus ? 'task__checked' : null}`} onClick={() => getChecked(task)}/>
                        <span className={`task__title ${task.completedStatus ? 'task__title-checked' : null}`}>{task.title}</span>
                        <button
                          className='task__full-size'
                          onClick={() => {
                            setIsEditTaskOpen(true);
                            setSelectedTask(task);
                          }}
                        >
                          <img
                            className='more_icon'
                            src='/images/more.svg'
                            alt="More options"
                          />
                        </button>
                      </div>
                    ))}
                </div>
                <div className='board__edit-form'>
                  {isAddTaskOpen && (selectedBoardType === board) && (
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
