import {
  LocalStorageKeys,
  setToLocalStorage,
  getFromLocalStorage,
} from "./local-storage";
import { DeskColumns, ColumnCards } from ".././App";
import { defaultColumns, defaultCards } from "./default-data";

export const setUserNameData = (): string => {
  const userNameFromStorage = getFromLocalStorage(LocalStorageKeys.USER_NAME);

  if (userNameFromStorage) return userNameFromStorage;
  return "";
};

export const setColumnsData = (): DeskColumns => {
  const columnsFromStorage = getFromLocalStorage(LocalStorageKeys.COLUMNS);

  if (columnsFromStorage) {
    return columnsFromStorage;
  } else {
    setToLocalStorage(defaultColumns, LocalStorageKeys.COLUMNS);
    return defaultColumns;
  }
};

export const setCardsData = (): ColumnCards => {
  const cardsFromStorage = getFromLocalStorage(LocalStorageKeys.CARDS);

  if (cardsFromStorage) {
    return cardsFromStorage;
  } else {
    setToLocalStorage(defaultCards, LocalStorageKeys.CARDS);
    return defaultCards;
  }
};
