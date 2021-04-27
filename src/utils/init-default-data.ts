import {
  LocalStorageKeys,
  setToLocalStorage,
  getFromLocalStorage,
} from "./local-storage";
import { CardComments } from ".././App";
import { defaultComments } from "./default-data";

export const initCommentsData = (): CardComments => {
  const commentsFromStorage = getFromLocalStorage(LocalStorageKeys.COMMENTS);

  if (commentsFromStorage) {
    return commentsFromStorage;
  } else {
    setToLocalStorage(defaultComments, LocalStorageKeys.COMMENTS);
    return defaultComments;
  }
};
