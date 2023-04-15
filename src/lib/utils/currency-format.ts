export const formatRupiah = (num: number) => {
  return num.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
};
