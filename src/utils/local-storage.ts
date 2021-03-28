const USER_NAME_KEY = "USER_NAME_KEY";
const COLUMN_KEY = "COLUMN_KEY";

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
  localStorage.setItem(COLUMN_KEY, columnsSer);
};

export const loadColumnsLS = (): any => {
  const columnsFromLS = localStorage.getItem(COLUMN_KEY);
  if (columnsFromLS) return JSON.parse(columnsFromLS);
  return "";
};
