import {useState} from 'react';
import type {TaskType} from '../../types/task-type.ts';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import PrioritySelection from '../priority-selection';

interface TaskFormEditProps {
  task: TaskType;
  removeTask: (id: string) => void;
  onClose: () => void;
  updateTask: (task: TaskType) => void;
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({task, removeTask, onClose, updateTask }) => {
  const [editedTask, setEditedTask] = useState<TaskType>({
    ...task,
    deadline: task.deadline || null
  });

  const [showPriority, setShowPriority] = useState(false);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditedTask((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleDateChange = (date: Date | null) => {
    setEditedTask(prev => ({
      ...prev,
      deadline: date
    }));
  };

  return (
    <form className='edit-form' onSubmit={(e) => {
      e.preventDefault();
      updateTask({
        ...editedTask,
      });

      onClose();
    }} >
      <input className='edit-form__title' defaultValue={task.title} onChange={handleTaskChange} name='title' required/>
      <textarea className='edit-form__description' defaultValue={task.description} onChange={handleTaskChange} name='description'></textarea>
      <select
        name='boardType'
        defaultValue={task.boardType}
        onChange={handleTaskChange}
        className='edit-form__selected-board'
      >
        <option value='todo'>Todo</option>
        <option value='in_progress'>In progress</option>
        <option value='done'>Done</option>
      </select>

      <DatePicker
        selected={editedTask.deadline ?? null}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
        isClearable
        placeholderText='Choose task deadline'
        minDate={new Date()}
      />

      <button className='task__priority' title='Task priority' onClick={() => setShowPriority(!showPriority)}
              type='button'>
        {
          showPriority
            ? <PrioritySelection setEditedTask={setEditedTask}/>
            : null
        }
        {
          task.priority ? (
            <span className='task__priority-item' data-priority="1">
              <img className='priority__image' src={`../public/images/flag${task.priority}.svg`} alt='priority'/>
            </span>
          ) : null
        }
      </button>

      <button className='delete__button button' onClick={() => {
        onClose();
        removeTask(task.id);
      }}
              type='button'>Delete
      </button>

      <button className='edit-form__submit button' type='submit'>Save</button>
      <button className='edit-form__submit button' type='button' onClick={onClose}>Cancel</button>
    </form>
  );
}

export default TaskFormEdit;
