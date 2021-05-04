export const required = (value: string) => {
  if (typeof value === "string") {
    return value.trim() ? undefined : `Required`;
  }
  return value ? undefined : `Required`;
};
