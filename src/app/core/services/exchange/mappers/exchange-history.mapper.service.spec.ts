import {
  ExchangeHistory,
  ExchangeRates,
  ExchangeRateStatistics
} from '../interfaces/exchange-history.interface';
import { ExchangeHistoryMapperService } from './exchange-history.mapper.service';

describe('ExchangeHistoryMapperService', () => {
  let service: ExchangeHistoryMapperService;
  const response = {
    rates: { '2023-02-10': { USD: '1.23' }, '2022-01-02': { USD: '1.24' } }
  };
  const baseCurrency = 'USD';

  beforeEach(() => {
    service = new ExchangeHistoryMapperService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return exchange history', () => {
    const expectedHistory: ExchangeRates[] = [
      { date: '2022-01-02', rate: '1.24' },
      { date: '2023-02-10', rate: '1.23' }
    ];
    const result = service.toModel(response, baseCurrency);
    expect(result.history).toEqual(expectedHistory);
  });

  it('should return exchange rate statistics', () => {
    const expectedStatistics: ExchangeRateStatistics = {
      highest: 1.24,
      lowest: 1.23,
      average: 1.235
    };
    const result = service.toModel(response, baseCurrency);
    expect(result.statistics).toEqual(expectedStatistics);
  });
});
