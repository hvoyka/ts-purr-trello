export interface CardComment {
  id: string;
  cardId: string;
  text: string;
  author: string;
}

export type CardComments = Record<string, CardComment>;

export interface CommentsData {
  data: CardComments;
}

export interface ChangePayload {
  id: string;
  text: string;
}
