export const required = (value: string) => {
  const currentValue = typeof value === "string" ? value.trim() : value;
  return currentValue ? undefined : `Required`;
};
