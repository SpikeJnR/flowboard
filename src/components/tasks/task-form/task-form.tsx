import { useState } from 'react';
import type {TaskType} from '../../../types/task-type.ts';
import {useTaskContext} from "../../../contexts/task-context.tsx";

type TaskFormProps = {
  status: TaskType['boardType'];
};

const TaskForm = ({ status}: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {addTask, setIsAddTaskOpen} = useTaskContext();

  const handleOnAddTask = (evt: React.FormEvent) => {
    evt.preventDefault();
    addTask({
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
        <button type="button" onClick={() => setIsAddTaskOpen(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
