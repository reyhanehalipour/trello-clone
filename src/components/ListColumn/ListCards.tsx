import React from "react";
import { useBoardStore } from "../../hooks/useBoardStore";
import CardItem from "../CardItem";
import { List } from "@/libs/types";

interface Props {
  list: List;
}

const ListCards: React.FC<Props> = ({ list }) => {
  const board = useBoardStore((state) => state.board);

  const cards = list.cardIds.map((id) => board.cards[id]);

  return (
    <div className="list-cards">
      {cards.map((card) => (
        <CardItem key={card.id} cardId={card.id} />
      ))}
    </div>
  );
};

export default ListCards;



