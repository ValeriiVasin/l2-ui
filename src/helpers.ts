export function priceToString(price: number) {
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

export function interestAmount(amount: number, interest: number) {
  return Math.ceil(amount * interest / 100);
}

interface IL2OnPrice {
  price: number;
}

export function medianPrice(prices: IL2OnPrice[]) {
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

function isLocalhost() {
  return window.location.hostname.includes('localhost');
}

export function getAPIPath(path: string) {
  const API_BASE_PATH = isLocalhost() ? 'http://localhost:3011' : 'https://l2.valeriivasin.com';

  return path.startsWith('/') ? `${API_BASE_PATH}${path}` : `${API_BASE_PATH}/${path}`;
}

export function getMinutesAgo(timestamp: Date | number): number {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;

  return Math.ceil(
    (Date.now() - date.getTime()) / (60 * 1000),
  );
}
