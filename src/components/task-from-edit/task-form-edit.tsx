import {useState} from 'react';
import type {TaskType} from '../../types/task-type.ts';
import * as React from 'react';

interface TaskFormEditProps {
  task: TaskType;
  removeTask: (id: string) => void;
  onClose: () => void;
  updateTask: (task: TaskType) => void;
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({task, removeTask, onClose, updateTask }) => {

  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditedTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  return (
    <form className='edit-form' onSubmit={(e) => {
      e.preventDefault();
      updateTask(editedTask);
      onClose();
    }} >
      <input className='edit-form__title' defaultValue={task.title} onChange={handleChange} name='title'/>
      <textarea className='edit-form__description' defaultValue={task.description} onChange={handleChange} name='description'></textarea>
      <select
        name='status'
        value={editedTask.boardType}
        onChange={handleChange}
        className='edit-form__selected-board'
      >
        <option value='todo'>Todo</option>
        <option value='in-progress'>In progress</option>
        <option value='done'>Done</option>
      </select>
      <button className='delete__button button' onClick={() => {
        onClose();
        removeTask(task.id);
      }}
      type='button'>Delete</button>
      <button className='edit-form__submit button' type='submit'>Save</button>
      <button className='edit-form__submit button' type='button' onClick={onClose}>Cancel</button>
    </form>
  );
}

export default TaskFormEdit;
