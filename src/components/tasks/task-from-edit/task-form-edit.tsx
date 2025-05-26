import {BoardCategory, Priority} from '../../../utils/const.ts';
import type {TaskType} from '../../../types/task-type.ts';
import {useState} from 'react';
import PrioritySelection from '../../priority-selection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';
import {useTaskContext} from '../../../contexts/task-context.tsx';

interface TaskFormEditProps {
  task: TaskType;
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({task}) => {
  const { deleteTask, updateTask, setIsEditTaskOpen} = useTaskContext();
  const [showPriorityPopover, setShowPriorityPopover] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskType>({
    ...task,
    deadline: task.deadline || null
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditedTask((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleDateChange = (date: Date | null) => {
    setEditedTask(prev => ({
      ...prev,
      deadline: date
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(editedTask);
    setIsEditTaskOpen(false);
  };

  return (
    <form className='edit-form' onSubmit={handleSubmit} >
      <input
        className='edit-form__title'
        defaultValue={task.title}
        onChange={handleTaskChange}
        name='title'
        required
      />

      <textarea
        className='edit-form__description'
        defaultValue={task.description}
        onChange={handleTaskChange}
        name='description'
      />

      <select
        className='edit-form__selected-board'
        defaultValue={task.boardType}
        onChange={handleTaskChange}
        name='boardType'
      >
        {Object.values(BoardCategory).map((category) =>
            <option value={category} key={category}>{category}</option>
        )}
      </select>

      <DatePicker
        selected={editedTask.deadline ?? null}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
        isClearable
        placeholderText='Choose task deadline'
        minDate={new Date()}
      />

      <div className="priority-wrapper">
        <button
          className='task__priority'
          title='TaskItem priority'
          onClick={() => setShowPriorityPopover(!showPriorityPopover)}
          type='button'
        >
          {
            editedTask.priority && editedTask.priority !== Object.values(Priority).length?
            (
              <span
                className='task__priority-item'
                data-priority={editedTask.priority}>
                <img
                  className='task__priority-image'
                  src={`../public/images/flag${editedTask.priority}.svg`}
                  alt='priority'
                />
              </span>
            ) : 'Choose priority'
          }
        </button>
        {
          showPriorityPopover &&  <PrioritySelection setEditedTask={setEditedTask} setShowPriorityPopover={setShowPriorityPopover} />
        }
      </div>

      <button
        className='delete__button button'
        onClick={() => {
          setIsEditTaskOpen(false);
          deleteTask(task.id);
        }}
        type='button'
      >
        Delete
      </button>

      <button
        className='edit-form__submit button'
        type='submit'
      >
        Save
      </button>

      <button className='edit-form__submit button' type='button' onClick={() => setIsEditTaskOpen(false)}>Cancel</button>
    </form>
  );
}

export default TaskFormEdit;
