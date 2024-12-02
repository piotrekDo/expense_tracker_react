export const trim = (text: string, val: number): string => {
  let sub = text.substring(0, val);
  return text.length > val ? sub + '...' : sub;
};

export const toDateString = (date: Date) => {
  return date.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
