import {
  LocalStorageKeys,
  setToLocalStorage,
  getFromLocalStorage,
} from "./local-storage";
import { DeskColumns, ColumnCards, CardComments } from ".././App";
import { defaultColumns, defaultCards, defaultComments } from "./default-data";

export const initColumnsData = (): DeskColumns => {
  const columnsFromStorage = getFromLocalStorage(LocalStorageKeys.COLUMNS);

  if (columnsFromStorage) {
    return columnsFromStorage;
  } else {
    setToLocalStorage(defaultColumns, LocalStorageKeys.COLUMNS);
    return defaultColumns;
  }
};

export const initCardsData = (): ColumnCards => {
  const cardsFromStorage = getFromLocalStorage(LocalStorageKeys.CARDS);

  if (cardsFromStorage) {
    return cardsFromStorage;
  } else {
    setToLocalStorage(defaultCards, LocalStorageKeys.CARDS);
    return defaultCards;
  }
};

export const initCommentsData = (): CardComments => {
  const commentsFromStorage = getFromLocalStorage(LocalStorageKeys.COMMENTS);

  if (commentsFromStorage) {
    return commentsFromStorage;
  } else {
    setToLocalStorage(defaultComments, LocalStorageKeys.COMMENTS);
    return defaultComments;
  }
};
