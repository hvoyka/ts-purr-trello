export type ColumnCards = Record<string, ColumnCard>;

export interface ColumnCard {
  id: string;
  columnId: string;
  title: string;
  text: string;
  author: string;
}

export interface CardsData {
  data: ColumnCards;
}
