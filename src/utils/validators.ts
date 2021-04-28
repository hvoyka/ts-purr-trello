export const required = (value: string) =>
  value?.trim() ? undefined : `Required`;
