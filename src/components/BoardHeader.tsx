import { useState, ChangeEvent, FocusEvent } from 'react';
import { useBoardStore } from '../hooks/useBoardStore';

export default function BoardHeader() {
  const board = useBoardStore((state: { board: any; }) => state.board);
  const updateTitle = useBoardStore((state: { updateBoardTitle: any; }) => state.updateBoardTitle);

  const [title, setTitle] = useState<string>(board.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newTitle = title.trim();
    if (newTitle) {
      updateTitle(newTitle);
    } else {
      setTitle(board.title); // revert if empty
    }
  };

  return (
    <div className="board-header">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}


