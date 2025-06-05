import { useEffect, useState } from 'react';
import type { TaskType } from '../../../types/task-type.ts';
import { useTaskContext } from '../../../contexts/task-context.tsx';

type TaskFormProps = {
  status: TaskType['boardType'];
};

const TaskForm = ({ status }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask, setIsAddTaskOpen } = useTaskContext();

  const handleOnAddTask = (evt: React.FormEvent) => {
    evt.preventDefault();
    addTask({
      title,
      description,
      boardType: status
    });
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setIsAddTaskOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <form className='task--form' onSubmit={handleOnAddTask}>
      <div>
        <input
          className='task__form--title'
          type='text'
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder='Add name of your task'
          required
        />
        <input
          className='task__form--description'
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder='Add task description'
        />
      </div>
      <div className='form-buttons'>
        <button className='task--form__submit' type='submit'>
          Add task
        </button>
        <button
          className='task--form__cancel'
          type='button'
          onClick={() => setIsAddTaskOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
