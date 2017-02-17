export function priceToString(price) {
  const str = price.toString();
  let result = '';

  for (let i = str.length - 1, count = 0; i >= 0; i--) {

    if (count === 3) {
      result += ' ';
      count = 0;
    }

    result += str.charAt(i);

    count += 1;
  }

  return result.split('').reverse().join('').trim();
}

export function interestAmount(amount, interest) {
  return Math.ceil(amount * interest / 100);
}

export function medianPrice(prices) {
  if (prices.length === 0) {
    return 'N/A';
  }

  const values = prices.map(price => price.price).sort((a, b) => a - b);
  const midIndex = Math.floor(values.length / 2);

  // non-odd
  if (values.length % 2) {
    return values[midIndex];
  }

  return Math.round((values[midIndex] + values[midIndex - 1]) / 2);
}
