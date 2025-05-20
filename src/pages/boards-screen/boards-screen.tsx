import {useEffect, useState} from 'react';
import type { TaskType } from '../../types/task-type';

import TaskForm from '../../components/task-form';
import {addTask, deleteTask, subscribeToTasks} from '../../services/taskService.ts';

const BoardsScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data) => {
      setTasks(data);
    });

    return () => unsubscribe(); // Отписка при размонтировании
  }, []);


  const addCard = async (newTask: TaskType) => {
    const task: TaskType = {
      ...newTask,
    };
    await addTask(task);
    // setTasks(prevTask => [...prevTask, task]);
  }

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  return (
    <div className='boards'>
      <section className='boards__container'>
        <div className='boards__control'></div>
        <div className='boards__wrapper'>
          <div className='boards__todo board'>
            <div className='board__header'>
              <h2 className='board__title'>To Do</h2>
              <button
                className='board__button'
                onClick={() => setIsOpen(true)}
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
                      onClick={() => removeTask(task.id)}
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
              {isOpen && (
                <TaskForm
                  addTaskForm={addCard}
                  status="todo"
                  onClose={() => setIsOpen(false)}
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
