import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap} from '@angular/router';
import { of } from 'rxjs';
import { CurrencyConverterComponent } from './currency-converter.component';
import { ExchangeService } from 'src/app/core/services/exchange/exchange.service';
import { ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { CurrencyConversionResponse } from 'src/app/core/services/exchange/interfaces/currency-conversion.response';
import { ExchangeHistoryRequest } from 'src/app/core/services/exchange/interfaces/exchange-history.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let exchangeServiceSpy: jasmine.SpyObj<ExchangeService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(waitForAsync(() => {
    const exchangeHistorySpy = jasmine.createSpyObj('Observable', ['pipe']);
    const conversionResultSpy = jasmine.createSpyObj('Observable', ['pipe']);
    const mockQueryParams = {
      queryParams: of(convertToParamMap({ amount: 1, from: 'USD', to: 'EUR' }))
    };


    exchangeServiceSpy = jasmine.createSpyObj('ExchangeService', {
      getSymbols: of(['USD', 'EUR', 'GBP']),
      getExchangeHistory: exchangeHistorySpy,
      convertCurrency: conversionResultSpy
    });

    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      getStorage: [],
      setStorage: null
    });

    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', {
      queryParams: of(convertToParamMap({ amount: 1, from: 'USD', to: 'EUR' }))
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterTestingModule
      ],
      declarations: [CurrencyConverterComponent],
      providers: [
        { provide: ExchangeService, useValue: exchangeServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ActivatedRoute, useValue: mockQueryParams },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call exchangeService.getSymbols on init', () => {
      fixture.detectChanges();
      expect(exchangeServiceSpy.getSymbols).toHaveBeenCalled();
    });
  });

  describe('getExchangeHistory', () => {
    it('should get the exchange history', () => {
      const exchangeHistoryRequest = {
        startDate: '2023-02-10',
        endDate: '2023-02-10',
        from: 'EUR'
      } as ExchangeHistoryRequest;

      component.getExchangeHistory(exchangeHistoryRequest);
      expect(exchangeServiceSpy.getExchangeHistory).toHaveBeenCalledWith(exchangeHistoryRequest);
    });
  });

  describe('handleConvertCurrency', () => {
    it('should convert currency and save conversion history', () => {
      const conversionRequest: ConversionInputInterface = {
        amount: 100,
        from: 'EUR',
        to: 'INR'
      };

      const conversionResult = {
        success: true,
        result: 80
      } as CurrencyConversionResponse;

      exchangeServiceSpy.convertCurrency.and.returnValue(of(conversionResult));
      component.handleConvertCurrency(conversionRequest);

      expect(exchangeServiceSpy.convertCurrency).toHaveBeenCalledWith(conversionRequest);
      expect(component.conversionRequest).toEqual(conversionRequest);
      expect(storageServiceSpy.setStorage).toHaveBeenCalled();
    });

  });
});
