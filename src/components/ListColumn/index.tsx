"use client";

import { useState } from "react";
import ListHeader from "./ListHeader";
import ListCards from "./ListCards";
import { List } from "../../libs/types";
import { useBoardStore } from "@/hooks/useBoardStore";

interface ListColumnProps {
  list: List;
}

export default function ListColumn({ list }: ListColumnProps) {
  const addCard = useBoardStore((state) => state.addCard);
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddCard = () => {
    if (!newTitle.trim()) return;
    addCard(list.id, newTitle.trim());
    setNewTitle("");
    setShowInput(false);
  };

  return (
    <div className="list-column">
      <ListHeader list={list} />
      <ListCards list={list} />

      <div className="add-card">
        {showInput ? (
          <div className="add-card-input">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter card title..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCard();
                if (e.key === "Escape") setShowInput(false);
              }}
            />
            <div className="add-card-buttons">
              <button onClick={handleAddCard}>Add Card</button>
              <button onClick={() => setShowInput(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)}>+ Add another card</button>
        )}
      </div>
    </div>
  );
}
