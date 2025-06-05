import { useTaskContext } from '../../contexts/task-context.tsx';

type BoardHeaderProps = {
  board: string;

  setSelectedBoardType: (boardType: string | null) => void;
};

/* Returns board header */
const BoardHeader = ({ board, setSelectedBoardType }: BoardHeaderProps) => {
  const { isAddTaskOpen, setIsAddTaskOpen } = useTaskContext();

  return (
    <div className='board__header'>
      <h2 className='board__title'>{board}</h2>
      <button
        className='board__button'
        name={board}
        onClick={evt => {
          setIsAddTaskOpen(!isAddTaskOpen);
          setSelectedBoardType(evt.currentTarget.getAttribute('name'));
        }}
      ></button>
    </div>
  );
};

export default BoardHeader;
