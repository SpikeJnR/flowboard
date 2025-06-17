import { Days, Priority } from '../../../utils/const.ts';
import type { TaskType } from '../../../types/task-type.ts';
import { type Dispatch, type SetStateAction } from 'react';
import { useTaskContext } from '../../../contexts/task-context.tsx';

type TaskItemProps = {
  board: string;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
};

const TaskItem = ({ board, setSelectedTask }: TaskItemProps) => {
  const { tasks, showCompleted, updateTask, setIsEditTaskOpen } = useTaskContext();
  const getChecked = (task: TaskType) => {
    task.completedStatus = !task.completedStatus;
    updateTask(task);
  };

  const getPriority = (task: TaskType) => {
    switch (task.priority) {
      case 1:
        return 'red__priority';
      case 2:
        return 'blue__priority';
      case 3:
        return 'green__priority';
      default:
        return '';
    }
  };

  return (
    <>
      {tasks
        .filter(task => task.boardType === board && (!showCompleted || !task.completedStatus))
        .map(task => (
          <div className='task__wrapper' key={task.id}>
            <div className={`task__wrapper--marker ${getPriority(task)}`}></div>
            <div className='task__main'>
              <button
                className={`task__button ${task.completedStatus ? 'task__checked' : ''}`}
                onClick={() => getChecked(task)}
              />
              <span className={`task__title ${task.completedStatus ? 'task__title-checked' : ''}`}>
                {task.title}
              </span>
              <button
                className='task__full-size'
                onClick={() => {
                  setIsEditTaskOpen(true);
                  setSelectedTask(task);
                }}
              >
                <img className='more_icon' src='/images/more.svg' alt='More options' />
              </button>
            </div>
            {
              <div className='task__bottom'>
                {task.deadline ? (
                  <span className='task__deadline' title='TaskItem deadline'>
                    <img
                      className='calendar'
                      src='../public/images/calendar.svg'
                      alt='calendar'
                      width='24px'
                      height='24px'
                    />
                    <span className='deadline__title'>{`${Days[task.deadline.getMonth()]} ${task.deadline.getDate()}`}</span>
                  </span>
                ) : null}
                {task.priority && task.priority !== Object.values(Priority).length ? (
                  <span className='task__bottom-priority' title='TaskItem priority'>
                    <img
                      className='priority'
                      src={`../public/images/flag${task.priority}.svg`}
                      alt='priority'
                      width='24px'
                      height='24px'
                    />
                    <span className={`priority__title ${getPriority(task)}-bottom`}>
                      {`${Object.values(Priority)[task.priority - 1]} priority`}
                    </span>
                  </span>
                ) : null}
              </div>
            }
          </div>
        ))}
    </>
  );
};

export default TaskItem;
