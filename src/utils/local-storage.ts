export enum LocalStorageKeys {
  USER_NAME = "USER_NAME",
  COLUMNS = "COLUMNS",
  CARDS = "CARDS",
}

export const setToLocalStorage = (
  data: Record<string, any> | string,
  key: LocalStorageKeys
) => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(LocalStorageKeys[key], stringifyData);
};

export const loadUserLS = (): string => {
  const nameFromLS = localStorage.getItem(LocalStorageKeys.USER_NAME);

  if (nameFromLS) return nameFromLS;
  return "";
};

export const loadColumnsLS = (): any => {
  const columnsFromLS = localStorage.getItem(LocalStorageKeys.COLUMNS);
  if (columnsFromLS) return JSON.parse(columnsFromLS);
  return "";
};

export const loadCardsLS = (): any => {
  const cardsFromLS = localStorage.getItem(LocalStorageKeys.CARDS);
  if (cardsFromLS) return JSON.parse(cardsFromLS);
  return "";
};
