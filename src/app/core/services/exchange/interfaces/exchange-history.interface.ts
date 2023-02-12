export interface ExchangeHistory {
  history: ExchangeRates[];
  statistics: ExchangeRateStatistics;
}

export interface ExchangeRates {
  date: string;
  rate: string;
}

export interface ExchangeRateStatistics {
  lowest: number;
  highest: number;
  average: number;
}

export interface ExchangeHistoryRequest {
  startDate: string;
  endDate: string;
  baseCurrency?: string;
}

export interface CalculatedRates {
  max: number;
  min: number;
  avg: number;
}
