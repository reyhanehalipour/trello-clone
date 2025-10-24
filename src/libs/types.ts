export type ID = string;


export interface Comment {
id: ID;
text: string;
createdAt: string; // ISO
}


export interface Card {
id: ID;
title: string;
description?: string;
comments: Comment[];
createdAt: string;
}


export interface List {
id: ID;
title: string;
cardIds: ID[]; // ترتیب کارت‌ها
}


export interface Board {
id: ID;
title: string;
lists: Record<ID, List>;
cards: Record<ID, Card>;
listOrder: ID[]; // ترتیب لیست‌ها
}