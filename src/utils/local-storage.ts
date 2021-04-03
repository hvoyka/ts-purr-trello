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

export const loadFromLocalStorage = (key: LocalStorageKeys) => {
  const stringifyData = localStorage.getItem(LocalStorageKeys[key]);
  return stringifyData ? JSON.parse(stringifyData) : null;
};
