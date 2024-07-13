export const validateExpiryDate = (expireDate: string) => {
  const month = expireDate.split('/')[0];
  const year = expireDate.split('/')[1];

  const dateNow = new Date();
  const monthNow = dateNow.getMonth() + 1;
  const yearNow = parseInt(String(dateNow.getFullYear()).replace("20", ""));

  if (parseInt(month) > 12 || parseInt(month) < 1) return false;

  if (parseInt(year) < yearNow) return false;

  if (parseInt(year) == yearNow && parseInt(month) < monthNow) return false;

  return true
};
