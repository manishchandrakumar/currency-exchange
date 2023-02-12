export interface ConversionInputInterface {
  amount: number,
  from: string,
  to: string
}

export interface ConversionHistory {
  id: number,
  conversionDate: string;
  conversionTime: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}
