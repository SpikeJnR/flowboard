import {useState} from 'react';
import type {TaskType} from '../../types/task-type.ts';
import {nanoid} from 'nanoid';
import TaskForm from '../../components/task-form';


const BoardsScreen = () => {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addCard = (newTask) => {
    const task = {
      id: nanoid(),
      ...newTask,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    };

    setTasks(prevTask => [...prevTask, task]);
    console.log('work');
    setIsOpen(false);
  }

  const removeTask = (id: string) => {
    setTasks(prevTask => prevTask.filter((task) => task.id !== id));
  }

  return (
    <div className='boards'>
        <section className='boards__container'>
          <div className='boards__control'>
          </div>

          {
            isOpen ? <TaskForm addTaskForm={addCard} /> : null
          }
          <div className='boards__wrapper'>
            <div className='boards__todo board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  To Do
                </h2>
                <button className='board__button' onClick={() => setIsOpen(true)}></button>
              </div>
              <div className='card__list'>
                {
                  tasks.map((task: TaskType) => (
                    <div className='task' key={task.id} id={task.id}>
                      <button className='task__button tark__checked' type='submit'>
                      </button>
                      <p className='task__title'>{task.title}</p>
                      <button className='task__full-size' onClick={() => removeTask(task.id)}>
                        <img className='more_icon' src='../public/images/more.svg'></img>
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='boards__on-going board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  On Going
                </h2>
                <button className='board__button'> </button>
              </div>
            </div>
            <div className='boards__completed board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  Completed
                </h2>
                <button className='board__button'> </button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default BoardsScreen;

