import type {BoardType} from '../../types/board-type.ts';
import {addBoardSettings} from '../../services/taskService.ts';
import {type Dispatch, type SetStateAction} from 'react';

type BoardsControlProps = {
  showCompleted: boolean;
  setShowCompleted: Dispatch<SetStateAction<boolean>>;
}

const BoardsControl = ({showCompleted, setShowCompleted}: BoardsControlProps) => {

  const handleBoardSettings = async (boardData: BoardType) => {
    try {
      setShowCompleted(prev => !prev);
      await addBoardSettings({
        ...boardData,
        completedStatus: !showCompleted
      });
    } catch (error) {
      setShowCompleted(prev => !prev);
      console.error('Failed to update board settings:', error);
    }
  }

  return (
    <div className='boards__control'>
      <div className='completed'>
        <span className='completed__title'> Completed task</span>
        <button className={`completed__button ${ !showCompleted ? 'completed__button-active' : null}`} onClick={() => (
          handleBoardSettings({id: 'currentBoardSettings', completedStatus: (!showCompleted)})
        )}
        />
      </div>
    </div>
  );
}

export default BoardsControl;
