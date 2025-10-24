// src/components/CardItem/index.tsx
"use client";

import { useState } from "react";
import { useBoardStore } from "../../hooks/useBoardStore";
import CardModal from "./CardModal";

interface CardItemProps {
  cardId: string;
}

export default function CardItem({ cardId }: CardItemProps) {
  const board = useBoardStore((state) => state.board);
  const card = board.cards[cardId];

  const [isOpen, setIsOpen] = useState(false);

  if (!card) return null;

  return (
    <>
      <div className="card-item">
        {card.title}
        <p onClick={() => setIsOpen(true)}>comment</p>
      </div>
      {isOpen && <CardModal card={card} onClose={() => setIsOpen(false)} />}
    </>
  );
}
