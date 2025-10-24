import { useState, ChangeEvent, FocusEvent } from 'react';
import { List } from '../../libs/types';
import { useBoardStore } from '../../hooks/useBoardStore';

interface ListHeaderProps {
  list: List;
}

export default function ListHeader({ list }: ListHeaderProps) {
  const updateListTitle = useBoardStore((state) => state.updateListTitle);
  const [title, setTitle] = useState<string>(list.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newTitle = title.trim();
    if (newTitle) updateListTitle(list.id, newTitle);
    else setTitle(list.title); // revert if empty
  };

  return (
    <div className="list-header">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
