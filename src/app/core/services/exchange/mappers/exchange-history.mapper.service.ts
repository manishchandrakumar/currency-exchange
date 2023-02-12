import { Injectable } from '@angular/core';
import { CalculatedRates, ExchangeHistory, ExchangeRates, ExchangeRateStatistics } from '../interfaces/exchange-history.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeHistoryMapperService {

  exchangeRates: object;
  toCurrency: string;

  toModel(response: {rates: object}, toCurrency: string): ExchangeHistory {
    this.exchangeRates = response.rates;
    this.toCurrency = toCurrency;

    return {
      history: this.history,
      statistics: this.statistics
    }

  }

  private get statistics(): ExchangeRateStatistics {
    const rates = this.history.map(history => Number(history.rate));
    const { max: highest, min: lowest, avg: average } = this.calculateRates(rates);

    return { highest, lowest, average };
  }

  private get history(): ExchangeRates[] {
    return Object.entries(this.exchangeRates)
      .map(([date, exchangeRate]) => ({ date, rate: exchangeRate[this.toCurrency] }))
      .reverse();
  }

  private calculateRates(rates: number[]): CalculatedRates {
    const sum = rates.reduce((a, b) => a + b, 0);
    const max = Math.max(...rates);
    const min = Math.min(...rates);
    const avg = sum / rates.length;

    return { max, min, avg: Number(avg.toFixed(5)) };
}

}
