import type {BoardType} from '../../types/board-type.ts';
import {addBoardSettings} from '../../services/taskService.ts';
import {useTaskContext} from '../../contexts/task-context.tsx';

const BoardsControl = () => {

  const {showCompleted, setShowCompleted} = useTaskContext();

  const handleBoardSettings = async (boardData: BoardType) => {
    try {
      setShowCompleted(!showCompleted);
      await addBoardSettings({
        ...boardData,
        completedStatus: !showCompleted
      });
    } catch (error) {
      setShowCompleted(!showCompleted);
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
