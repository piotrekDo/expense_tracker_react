export const trim = (text: string, val: number): string => {
  let sub = text.substring(0, val);
  return text.length > val ? sub + '...' : sub;
};
