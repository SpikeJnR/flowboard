import { useState } from 'react';
import type {TaskType} from '../../../types/task-type.ts';

type TaskFormProps = {
  addTaskForm: (task: Pick<TaskType, 'title' | 'description' | 'boardType'>) => void;
  status: TaskType['boardType'];
  onClose: () => void;
};

const TaskForm = ({ addTaskForm, status, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOnAddTask = (evt: React.FormEvent) => {
    evt.preventDefault();
    addTaskForm({
      title,
      description,
      boardType: status,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form className='task--form' onSubmit={handleOnAddTask}>
      <input
        className='task__form--title'
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="TaskItem title"
        required
      />
      <textarea
        className='task__form--description'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="TaskItem description"
      />
      <div className="form-buttons">
        <button type="submit">Add TaskItem</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
