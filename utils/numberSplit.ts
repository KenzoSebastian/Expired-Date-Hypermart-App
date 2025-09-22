export const numberSplit = (email: string): string | null => {
  const match = email.match(/\.(\d+)@/);
  return match ? match[1] : null;
};
