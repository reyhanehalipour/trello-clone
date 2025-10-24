// src/components/CommentsModal.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Card, Comment } from "../../libs/types";
import { useBoardStore } from "../../hooks/useBoardStore";
import { v4 as uuid } from "uuid";

interface CommentsModalProps {
  card: Card;
  onClose: () => void;
}

export default function CommentsModal({ card, onClose }: CommentsModalProps) {
  const [text, setText] = useState("");
  const setBoard = useBoardStore((state) => state.setBoard);
  const board = useBoardStore((state) => state.board);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: Comment = {
      id: uuid(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedCard = { ...card, comments: [...card.comments, newComment] };
    const updatedBoard = {
      ...board,
      cards: { ...board.cards, [card.id]: updatedCard },
    };

    setBoard(updatedBoard);
    setText("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>Comments</h4>

        <ul>
          {card.comments.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            placeholder="Add comment"
          />
          <button type="submit">Add comment</button>
        </form>
      </div>
    </div>
  );
}
