import { useState } from 'react';
import type {TaskType} from '../../types/task-type.ts';

type TaskFormProps = {
  addTaskForm: (task: Omit<TaskType, 'id' | 'completedStatus'>) => void;
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
        placeholder="Task title"
        required
      />
      <textarea
        className='task__form--description'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Task description"
      />
      <div className="form-buttons">
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
