const EXCHANGE_RATE = 17645;

export const convertToIDR = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value * EXCHANGE_RATE);
