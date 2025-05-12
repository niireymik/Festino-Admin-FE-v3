export const prettyPrice = (price: number) => {
  if (price === null || price === undefined) return '';
  if (typeof price === 'string') price = parseInt(price);
  return price.toLocaleString('ko-KR') + '원';
};