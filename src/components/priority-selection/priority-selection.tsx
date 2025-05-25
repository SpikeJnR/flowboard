import type {Dispatch, SetStateAction} from 'react';
import type {TaskType} from '../../types/task-type.ts';
import {Priority} from '../../utils/const.ts';

type PrioritySelectionProps = {
  setEditedTask: Dispatch<SetStateAction<TaskType>>;
  setShowPriorityPopover: Dispatch<SetStateAction<boolean>>;
}

const PrioritySelection = ({ setEditedTask, setShowPriorityPopover }: PrioritySelectionProps) => {

  const handlePriorityClick = (evt: number) => {
    setEditedTask((prev:  TaskType )=> ({
      ...prev,
      priority: evt,
    }));
    setShowPriorityPopover(false);
  };

  /* Returns a popover with a priority selection */
  return (
    <div className='task__priority-list'>
      {Object.entries(Priority).map(([key, label], index) => (
        <div
          className='task__priority-item'
          key={key}
          data-priority={index + 1}
          onClick={() => handlePriorityClick(index + 1)}
        >
          <img
            className='task__priority-image'
            src={`/images/flag${index + 1}.svg`}
            alt={`${label} priority icon`}
          />
          <p className='priority__title'>
            {label} priority
          </p>
        </div>
      ))}
    </div>
  );
}

export default PrioritySelection;
