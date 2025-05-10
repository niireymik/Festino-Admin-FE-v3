export const prettyPrice = (price: number) => {
  if (price === null) return '';
  if (typeof price === 'string') price = parseInt(price);
  return price.toLocaleString('ko-KR') + '원';
};

export const formatMonth = (month: number) => {
  return String(month).padStart(2, '0');
}