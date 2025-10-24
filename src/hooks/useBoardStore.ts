'use client';

import { v4 as uuid } from 'uuid';
import { Board, Card, List, Comment } from '@/libs/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { demoBoard } from './demodata';

const LOCAL_KEY = 'trello_clone_board_v1';

interface BoardState {
  board: Board;
  setBoard: (b: Board) => void;
  updateBoardTitle: (title: string) => void;
  
  // List
  addList: (title: string) => void;
  removeList: (listId: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  moveList: (sourceIndex: number, destinationIndex: number) => void;

  // Card
  addCard: (listId: string, title: string) => void;
  updateCardTitle: (cardId: string, title: string) => void;
  moveCard: (cardId: string, sourceListId: string, destListId: string, destIndex: number) => void;

  // Comment
  addComment: (cardId: string, text: string) => void;
}

export const useBoardStore = create<BoardState>()(
  devtools((set, get) => ({
    board: (typeof window !== 'undefined' && localStorage.getItem(LOCAL_KEY))
      ? JSON.parse(localStorage.getItem(LOCAL_KEY)!)
      : demoBoard,

    setBoard: (board) => {
      set({ board });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(board));
    },

    updateBoardTitle: (title) => {
      const board = get().board;
      const newBoard = { ...board, title };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    // -------- List Methods --------
    addList: (title: string) => {
      const board = get().board;
      const id = uuid();
      const newList: List = { id, title, cardIds: [] };
      const newBoard = {
        ...board,
        lists: { ...board.lists, [id]: newList },
        listOrder: [...board.listOrder, id],
      };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    removeList: (listId: string) => {
      const board = get().board;
      const { [listId]: removed, ...restLists } = board.lists;
      const newBoard = {
        ...board,
        lists: restLists,
        listOrder: board.listOrder.filter((id) => id !== listId),
      };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    updateListTitle: (listId: string, title: string) => {
      const board = get().board;
      const list = board.lists[listId];
      if (!list) return;
      const updatedList = { ...list, title };
      const newBoard = {
        ...board,
        lists: { ...board.lists, [listId]: updatedList },
      };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    moveList: (sourceIndex: number, destinationIndex: number) => {
      const board = get().board;
      const newOrder = Array.from(board.listOrder);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, removed);
      const newBoard = { ...board, listOrder: newOrder };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    // -------- Card Methods --------
    addCard: (listId: string, title: string) => {
      const board = get().board;
      const id = uuid();
      const newCard: Card = { id, title, comments: [], createdAt: new Date().toISOString() };
      const list = board.lists[listId];
      if (!list) return;
      const updatedList = { ...list, cardIds: [...list.cardIds, id] };
      const newBoard = {
        ...board,
        lists: { ...board.lists, [listId]: updatedList },
        cards: { ...board.cards, [id]: newCard },
      };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    updateCardTitle: (cardId: string, title: string) => {
      const board = get().board;
      const card = board.cards[cardId];
      if (!card) return;
      const updatedCard = { ...card, title };
      const newBoard = { ...board, cards: { ...board.cards, [cardId]: updatedCard } };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    moveCard: (cardId, sourceListId, destListId, destIndex) => {
      const board = get().board;
      const sourceList = board.lists[sourceListId];
      const destList = board.lists[destListId];
      if (!sourceList || !destList) return;

      const newSourceIds = sourceList.cardIds.filter((id) => id !== cardId);
      const newDestIds = Array.from(destList.cardIds);
      newDestIds.splice(destIndex, 0, cardId);

      const newBoard = {
        ...board,
        lists: {
          ...board.lists,
          [sourceListId]: { ...sourceList, cardIds: newSourceIds },
          [destListId]: { ...destList, cardIds: newDestIds },
        },
      };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },

    // -------- Comment Methods --------
    addComment: (cardId: string, text: string) => {
      const board = get().board;
      const card = board.cards[cardId];
      if (!card) return;

      const newComment: Comment = {
        id: uuid(),
        text,
        createdAt: new Date().toISOString(),
      };

      const updatedCard = { ...card, comments: [...card.comments, newComment] };
      const newBoard = { ...board, cards: { ...board.cards, [cardId]: updatedCard } };
      set({ board: newBoard });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newBoard));
    },
  }))
);
