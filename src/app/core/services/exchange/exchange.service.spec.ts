import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExchangeService } from './exchange.service';
import { ExchangeConstants } from './constants/exchange.constants';
import { ExchangeHistory, ExchangeHistoryRequest, ExchangeRates, ExchangeRateStatistics } from './interfaces/exchange-history.interface';
import { CurrencyConversionResponse } from './interfaces/currency-conversion.response';
import { ExchangeHistoryMapperService } from './mappers/exchange-history.mapper.service';
import { ConversionInputInterface } from './interfaces/conversion-input.interface';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let httpMock: HttpTestingController;
  const mockExchangeHistoryMapper = jasmine.createSpyObj('ExchangeHistoryMapperService', ['toModel']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExchangeService,
        { provide: ExchangeHistoryMapperService, useValue: mockExchangeHistoryMapper }
      ]
    });
    service = TestBed.inject(ExchangeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getSymbols', () => {
    it('should fetch symbols', () => {
      const mockSymbols = ['USD', 'GBP', 'EUR'];

      service.getSymbols().subscribe(symbols => {
        expect(symbols).toEqual(mockSymbols);
      });

      const req = httpMock.expectOne(`${ExchangeConstants.exchangeUrl}/symbols`);
      expect(req.request.method).toBe('GET');
      req.flush({ symbols: { USD: 1, GBP: 1, EUR: 1 } });
    });

  });

  describe('convertCurrency', () => {

    it('should convert currency', () => {
      const conversionRequest: ConversionInputInterface = {
        amount: 100,
        from: 'EUR',
        to: 'INR'
      };
      const mockConversionResponse = {
        success: true,
        result: 80
      } as CurrencyConversionResponse;

      service.convertCurrency(conversionRequest).subscribe(conversionResponse => {
        expect(conversionResponse.success).toBe(true);
        expect(conversionResponse.result).toBe(80);
      });

      const req = httpMock.expectOne(`${ExchangeConstants.exchangeUrl}/convert?amount=100&from=EUR&to=INR`);
      expect(req.request.method).toBe('GET');
      req.flush(mockConversionResponse);
    });

  });

  describe('getExchangeHistory', () => {
    it('should make a GET request to get exchange history', () => {
      const exchangeHisoryRequest = {
        startDate: '2023-02-10',
        endDate: '2023-02-17',
        from: 'EUR',
        to: 'INR'
      } as ExchangeHistoryRequest

      const history: ExchangeRates[] = [
        { date: '2022-01-02', rate: '1.24' },
        { date: '2023-02-10', rate: '1.23' }
      ];

      const statistics: ExchangeRateStatistics = {
        highest: 1.24,
        lowest: 1.23,
        average: 1.235
      };

      const exchangeDataMock = { history, statistics } as ExchangeHistory;
      const queryParam = `start_date=2023-02-10&end_date=2023-02-17&base=EUR`;

      mockExchangeHistoryMapper.toModel.and.returnValue(exchangeDataMock);

      service.getExchangeHistory(exchangeHisoryRequest).subscribe(exchangeHistory => {
        expect(exchangeHistory).toEqual(exchangeDataMock);
      });

      const req = httpMock.expectOne(`${ExchangeConstants.exchangeUrl}/timeseries?${queryParam}`);
      expect(req.request.method).toBe('GET');
      req.flush(exchangeDataMock);
    });

  });

});
