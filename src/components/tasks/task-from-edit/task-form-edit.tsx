import { BoardCategory, Priority } from '../../../utils/const.ts';
import type { TaskType } from '../../../types/task-type.ts';
import { useEffect, useState } from 'react';
import PrioritySelection from '../../priority-selection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';
import { useTaskContext } from '../../../contexts/task-context.tsx';

interface TaskFormEditProps {
  task: TaskType;
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({ task }) => {
  const { deleteTask, updateTask, setIsEditTaskOpen } = useTaskContext();
  const [showPriorityPopover, setShowPriorityPopover] = useState(false);
  const [titleLengthError, setTitleLengthError] = useState(false);
  const [descriptionLengthError, setDescriptionLengthError] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskType>({
    ...task,
    deadline: task.deadline || null
  });

  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    const fieldName = e.target.name;

    setEditedTask(prev => ({ ...prev, [fieldName]: newValue }));

    if (fieldName === 'title' && newValue.length > 50) {
      setTitleLengthError(true);
    } else if (fieldName === 'title') {
      setTitleLengthError(false);
    }

    if (fieldName === 'description' && newValue.length > 140) {
      setDescriptionLengthError(true);
    } else if (fieldName === 'description') {
      setDescriptionLengthError(false);
    }
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

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        if (showPriorityPopover) {
          setShowPriorityPopover(false);
        } else {
          setIsEditTaskOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPriorityPopover, setIsEditTaskOpen]);

  return (
    <form className='edit-form' onSubmit={handleSubmit}>
      <div className='edit-form__wrapper'>
        <div className='marker-edited marker-edited__top'></div>
        <input
          className={`edit-form__title ${titleLengthError ? 'edit-form__text-error' : ''}`}
          defaultValue={task.title}
          onChange={handleTaskChange}
          name='title'
          required
          placeholder='Write your task here'
        />
        {titleLengthError && (
          <p className='edit-form-input__error'>Maximum title length is 50 characters</p>
        )}

        <textarea
          className={`edit-form__description ${descriptionLengthError ? 'edit-form__text-error' : ''}`}
          defaultValue={task.description}
          onChange={handleTaskChange}
          name='description'
          placeholder='Write your task description here'
        />
        {descriptionLengthError && (
          <p className='edit-form-input__error'>Maximum title length is 140 characters</p>
        )}

        <div className='selected-board'>
          <span className='choose-element'> Choose priority: </span>
          <select
            className='edit-form__selected-board'
            defaultValue={task.boardType}
            onChange={handleTaskChange}
            name='boardType'
          >
            {Object.values(BoardCategory).map(category => (
              <option className='option' value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='selected-date'>
          <span className='choose-element'> Choose date: </span>
          <DatePicker
            className='datepicker'
            selected={editedTask.deadline ?? null}
            onChange={handleDateChange}
            dateFormat='dd.MM.yyyy'
            isClearable
            placeholderText='xx.xx.xxxx'
            minDate={new Date()}
          />
        </div>

        <div className='priority-wrapper'>
          <span className='choose-element'> Choose priority: </span>
          <button
            className='task__priority'
            title='TaskItem priority'
            onClick={() => setShowPriorityPopover(!showPriorityPopover)}
            type='button'
          >
            <span className='task__priority-image-choosed' data-priority={editedTask.priority}>
              <img
                className='task__priority-image'
                src={`../public/images/flag${editedTask.priority}.svg`}
                alt='priority'
              />
              <p
                className={`edit-form__priority`}
              >{`${Object.values(Priority)[editedTask.priority - 1]} priority`}</p>
            </span>
          </button>
          {showPriorityPopover && (
            <PrioritySelection
              setEditedTask={setEditedTask}
              setShowPriorityPopover={setShowPriorityPopover}
            />
          )}
        </div>

        <button className='edit-form__submit button' type='submit'>
          Save
        </button>

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
          className='edit-form__cancel button'
          type='button'
          onClick={() => setIsEditTaskOpen(false)}
        >
          Cancel
        </button>
        <div className='marker-edited marker-edited__reverted'></div>
      </div>
    </form>
  );
};

export default TaskFormEdit;
