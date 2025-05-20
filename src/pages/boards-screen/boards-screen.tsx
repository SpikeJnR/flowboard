import {useEffect, useState} from 'react';
import type { TaskType } from '../../types/task-type';
import TaskForm from '../../components/task-form';
import {addTask, deleteTask, subscribeToTasks, updateTask} from '../../services/taskService.ts';
import TaskFormEdit from '../../components/task-from-edit';

const BoardsScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data: TaskType[]) => {
      setTasks(data);
    });

    return () => unsubscribe(); // Отписка при размонтировании
  }, []);


  const addCard = async (newTask: Omit<TaskType, 'id'>) => {
    const task:  Omit<TaskType, 'id'> = {
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
      await updateTask(task);
    }catch (error) {
      console.error('Failed to update task-from-edit:', error);
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
        <div className='boards__control'></div>
        <div className='boards__wrapper'>
          <div className='boards__todo board'>
            <div className='board__header'>
              <h2 className='board__title'>To Do</h2>
              <button
                className='board__button'
                onClick={() => setIsAddTaskOpen(true)}
              ></button>
            </div>
            <div className='card__list'>
              {tasks
                .filter(task => task.status === 'todo')
                .map(task => (
                  <div className='task' key={task.id}>
                    <button className='task__button task__checked'/>
                    <p className='task__title'>{task.title}</p>
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
              {isAddTaskOpen && (
                <TaskForm
                  addTaskForm={addCard}
                  status="todo"
                  onClose={() => setIsAddTaskOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BoardsScreen;
