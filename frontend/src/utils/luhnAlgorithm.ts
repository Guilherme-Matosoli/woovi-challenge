export const luhnAlgorithm = (card: string) => {
  const trimCard = card.replace(/\D/g, '');

  let sum = 0;
  let shouldDouble = false;

  for (let i = trimCard.length - 1; i >= 0; i--) {
    let digit = parseInt(trimCard.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) digit -= 9;
    };

    sum += digit;
    shouldDouble = !shouldDouble;
  };

  return sum % 10 == 0;
}
