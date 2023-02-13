import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ExchangeService } from 'src/app/core/services/exchange/exchange.service';
import { ConversionHistory, ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { CurrencyConversionResponse } from 'src/app/core/services/exchange/interfaces/currency-conversion.response';
import { ExchangeHistory, ExchangeHistoryRequest } from 'src/app/core/services/exchange/interfaces/exchange-history.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import * as moment from 'moment';
import { ExchangeConstants } from 'src/app/core/services/exchange/constants/exchange.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html'
})
export class CurrencyConverterComponent implements OnInit {

  currencies: Observable<string[]>;
  baseCurrency: string;
  conversionResult: Observable<CurrencyConversionResponse>;
  exchangeHistory: Observable<ExchangeHistory>;
  conversionRequest: ConversionInputInterface;

  constructor(
    private exchangeService: ExchangeService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currencies = this.symbols;
    this.setConversionRequestFromQueryParam();
  }

  get symbols(): Observable<string[]> {
    return this.exchangeService.getSymbols();
  }

  getExchangeHistory(request: ExchangeHistoryRequest): void {
    this.exchangeHistory = this.exchangeService.getExchangeHistory(request);
  }

  handleConvertCurrency(conversionRequest: ConversionInputInterface): void {
    this.conversionRequest = conversionRequest;
    this.conversionResult = this.exchangeService.convertCurrency(conversionRequest);
    this.saveConversionHistory(this.getConversionHistory(conversionRequest));
  }

  private saveConversionHistory(conversionHistory: ConversionHistory): void {
    const conversionHistoryData = this.storageService.getStorage(ExchangeConstants.HistoryStorageKey) as ConversionHistory[];
    let history = [conversionHistory];

    if (conversionHistoryData?.length) {
      conversionHistoryData.push(conversionHistory);
      history = conversionHistoryData;
    }

    this.storageService.setStorage(ExchangeConstants.HistoryStorageKey, history);
  }

  private getConversionHistory(conversionInput: ConversionInputInterface): ConversionHistory {
    const uniqueId = new Date().valueOf();
    const currentDate = moment().format(ExchangeConstants.HistoryDateFormat);
    const currentTime = moment().format(ExchangeConstants.HistoryTimeFormat);

    return {
      id: uniqueId,
      conversionDate: currentDate,
      conversionTime: currentTime,
      fromCurrency: conversionInput.from,
      toCurrency: conversionInput.to,
      amount: conversionInput.amount
    };
  }

  private setConversionRequestFromQueryParam(): void {
    this.route.queryParams.subscribe((queryParam: ConversionInputInterface) => {
      if (!queryParam?.amount) { return; }

      this.conversionRequest = { ...queryParam };
      this.handleConvertCurrency(queryParam);
    });
  }

}




