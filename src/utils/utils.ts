export const prettyPrice = (price: number) => {
  if (price === null) return '';
  if (typeof price === 'string') price = parseInt(price);
  return price.toLocaleString('ko-KR') + '원';
};

export const isUUID = (uuid:string) => {
  const uuidRegex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
  return uuidRegex.test(uuid);
};