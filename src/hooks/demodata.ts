import { Board } from '../libs/types';
import { v4 as uuid } from 'uuid';


const c1 = uuid();
const c2 = uuid();
const c3 = uuid();
const l1 = uuid();
const l2 = uuid();
const l3= uuid();


export const demoBoard: Board = {
id: uuid(),
title: 'Demo Board',
lists: {
[l1]: { id: l1, title: 'To Do', cardIds: [c1] },
[l3]: { id: l3, title: 'in progress', cardIds: [c3] },
[l2]: { id: l2, title: 'Done', cardIds: [c2] },
},
cards: {
[c1]: { id: c1, title: 'Sample Task 1', comments: [], createdAt: new Date().toISOString() },
[c2]: { id: c2, title: 'Sample Task 2', comments: [], createdAt: new Date().toISOString() },
},
listOrder: [l1, l2],
};