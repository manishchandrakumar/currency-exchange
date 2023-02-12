export interface CurrencyConversionResponse {
  success: boolean;
  query: Query;
  info: Info;
  historical: boolean;
  date: string;
  result: number;
}

export interface Query {
  from: string;
  to: string;
  amount: number;
}

export interface Info {
  rate: number;
}



