import {Priority} from '../../utils/const.ts';
import type {TaskType} from '../../types/task-type.ts';
import type {Dispatch, SetStateAction} from 'react';

interface PrioritySelectionProps {
  setEditedTask: Dispatch<SetStateAction<TaskType>>;
}

const PrioritySelection = ({ setEditedTask }: PrioritySelectionProps) => {

  const handlePriorityClick = (evt: number) => {
    setEditedTask((prev:  TaskType )=> ({
      ...prev,
      priority: evt,
    }));
  };

  /* Returns a popover with a priority selection */
  return (
    <div className='task__priority-list'>
      {Object.values(Priority).map((priority, index) => (
        <div
          className='task__priority-item'
          key={index}
          data-priority={index + 1}
          onClick={() => handlePriorityClick(index + 1)}
        >
          <img
            className='priority__image'
            src={`/images/flag${index + 1}.svg`}
            alt='priority'
          />
          <p className='priority__title'>
            {priority} priority
          </p>
        </div>
      ))}
    </div>
  );
}

export default PrioritySelection;
