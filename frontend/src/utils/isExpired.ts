export const isExpired = (timestamp: Date) => {
  const date = new Date(timestamp);
  const dateNow = new Date();

  if (date < dateNow) return true;
  return false;
};
