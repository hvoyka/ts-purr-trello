import {
  LocalStorageKeys,
  setToLocalStorage,
  getFromLocalStorage,
} from "./local-storage";
import { ColumnCards, CardComments } from ".././App";
import { defaultCards, defaultComments } from "./default-data";

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
