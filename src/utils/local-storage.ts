const USER_NAME_KEY = "USER_NAME_KEY";

export const saveUserLS = (name: string) => {
  localStorage.setItem(USER_NAME_KEY, name);
};
export const loadUserLS = (): string => {
  const nameFromLS = localStorage.getItem(USER_NAME_KEY);

  if (nameFromLS) return nameFromLS;
  return "";
};
