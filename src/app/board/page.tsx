'use client';

import { useState } from 'react';
import BoardHeader from '@/components/BoardHeader';
import ListColumn from '@/components/ListColumn';
import { useBoardStore } from '@/hooks/useBoardStore';

export default function Page() {
  const board = useBoardStore((state) => state.board);
  const addList = useBoardStore((state) => state.addList);

  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAddList = () => {
    if (!newTitle.trim()) return;
    addList(newTitle.trim());
    setNewTitle('');
    setShowInput(false);
  };

  return (
    <main className="board-page">
      <BoardHeader />
      <section className="lists-container">
        {board.listOrder.map((listId: string) => {
          const list = board.lists[listId];
          return <ListColumn key={list.id} list={list} />;
        })}

        <div className="add-list">
          {showInput ? (
            <div className="add-list-input">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter list title..."
                autoFocus
              />
              <div className="add-list-buttons">
                <button onClick={handleAddList}>Add List</button>
                <button onClick={() => setShowInput(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowInput(true)}>+ Add another list</button>
          )}
        </div>
      </section>
    </main>
  );
}
