export const notEmpty = (value: string) =>
  value && /^$|\s+/.test(value) ? `Please enter not empty name!` : undefined;
