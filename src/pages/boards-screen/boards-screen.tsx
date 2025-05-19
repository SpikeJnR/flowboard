import { useState } from 'react';
import type { TaskType } from '../../types/task-type';
import { nanoid } from 'nanoid';
import TaskForm from '../../components/task-form';

const BoardsScreen = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addCard = (newTask: Omit<TaskType, 'id'>) => {
    const task: TaskType = {
      id: nanoid(),
      ...newTask,
    };
    setTasks(prevTask => [...prevTask, task]);
  }

  const removeTask = (id: string) => {
    setTasks(prevTask => prevTask.filter(task => task.id !== id));
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
