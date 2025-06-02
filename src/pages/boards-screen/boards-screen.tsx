import { useState } from 'react';
import type { TaskType } from '../../types/task-type';
import TaskForm from '../../components/tasks/task-form';
import TaskFormEdit from '../../components/tasks/task-from-edit';
import { BoardCategory } from '../../utils/const.ts';

import BoardsControl from '../../components/boards-control';
import BoardHeader from '../../components/board-header';
import TaskItem from '../../components/tasks/task-item';
import { useTaskContext } from '../../contexts/task-context.tsx';

const BoardsScreen = () => {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedBoardType, setSelectedBoardType] = useState<string | null>(null);
  const { isAddTaskOpen, isEditTaskOpen } = useTaskContext();

  return (
    <div className='boards'>
      <section className='boards__container'>
        <div className='edit-task-form'>
          {isEditTaskOpen && selectedTask ? <TaskFormEdit task={selectedTask} /> : null}
        </div>

        <BoardsControl />

        <div className='boards__wrapper'>
          {Object.values(BoardCategory).map(board => (
            <div className={`boards__${board} board`} key={board}>
              <BoardHeader board={board} setSelectedBoardType={setSelectedBoardType} />

              <div className='task__list'>
                <TaskItem board={board} setSelectedTask={setSelectedTask} />
              </div>

              <div className='board__edit-form'>
                {isAddTaskOpen && selectedBoardType === board && <TaskForm status={board} />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BoardsScreen;
