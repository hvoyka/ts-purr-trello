const USER_NAME_KEY = "USER_NAME_KEY";
const COLUMNS_KEY = "COLUMNS_KEY";
const CARDS_KEY = "CARDS_KEY";

export const saveUserLS = (name: string) => {
  localStorage.setItem(USER_NAME_KEY, name);
};

export const loadUserLS = (): string => {
  const nameFromLS = localStorage.getItem(USER_NAME_KEY);

  if (nameFromLS) return nameFromLS;
  return "";
};

export const saveColumnsLS = (columns: any) => {
  const columnsSer = JSON.stringify(columns);
  localStorage.setItem(COLUMNS_KEY, columnsSer);
};

export const loadColumnsLS = (): any => {
  const columnsFromLS = localStorage.getItem(COLUMNS_KEY);
  if (columnsFromLS) return JSON.parse(columnsFromLS);
  return "";
};

export const saveCardsLS = (cards: any) => {
  const cardsSer = JSON.stringify(cards);
  localStorage.setItem(CARDS_KEY, cardsSer);
};

export const loadCardsLS = (): any => {
  const cardsFromLS = localStorage.getItem(CARDS_KEY);
  if (cardsFromLS) return JSON.parse(cardsFromLS);
  return "";
};
