import {useEffect, useState} from 'react';
import type {TaskType} from '../../types/task-type';
import TaskForm from '../../components/task-form';
import {
  addBoardSettings,
  addTask,
  deleteTask,
  subscribeToBoardSettings,
  subscribeToTasks,
  updateTask
} from '../../services/taskService.ts';
import TaskFormEdit from '../../components/task-from-edit';
import {BoardCategory, Days} from '../../utils/const.ts';
import type {BoardType} from '../../types/board-type';

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

  const handleBoardSettings = async (boardData: BoardType) => {
    try {
      setShowCompleted(prev => !prev);
      await addBoardSettings({
        ...boardData,
        completedStatus: !showCompleted
      });
    } catch (error) {
      setShowCompleted(prev => !prev);
      console.error('Failed to update board settings:', error);
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
        <div className='boards__control'>
          <div className='completed'>
            <span className='completed__title'> Completed task</span>
            <button className={`completed__button ${ !showCompleted ? 'completed__button-active' : null}`} onClick={() => (
              handleBoardSettings({id: 'currentBoardSettings', completedStatus: (!showCompleted)})
            )}
            />
          </div>
        </div>
        <div className='boards__wrapper'>
          {
            Object.values(BoardCategory).map((board) => (
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
                  {
                    tasks
                    .filter(task => task.boardType === board && (!showCompleted || !task.completedStatus))
                    .map(task => (
                      <div className='task__wrapper' key={task.id}>
                        <div className='task__main'>
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
                        {
                          (
                            <div className='task__bottom'>
                              {
                                task.deadline ? (
                                  <span className='task__deadline' title='Task deadline'>
                                      <img className='calendar' src='../public/images/calendar.svg' alt='calendar'/>
                                      <span className='deadline__title'>{`${Days[task.deadline.getMonth()]} ${task.deadline.getDate()}`}</span>
                                  </span>
                                ) : null
                              }
                              {
                                task.priority ? (
                                  <span className='task__priority-item' title='Task priority'>
                                      <img className='priority' src={`../public/images/flag${task.priority}.svg`} alt='priority'/>
                                      <span className='priority__title'>Priority</span>
                                  </span>
                                ) : null
                              }
                            </div>
                          )
                        }

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
