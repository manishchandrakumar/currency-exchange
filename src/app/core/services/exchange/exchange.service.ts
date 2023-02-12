import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ExchangeConstants } from './constants/exchange.constants';
import { CurrencyConversionResponse } from './interfaces/currency-conversion.response';
import { ExchangeHistoryMapperService } from './mappers/exchange-history.mapper.service';
import { ExchangeHistory, ExchangeHistoryRequest } from './interfaces/exchange-history.interface';
import { Symbols } from './interfaces/symbol.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  constructor(
    private http: HttpClient,
    private exchangeHistoryMapper: ExchangeHistoryMapperService
  ) {}

  getSymbols(): Observable<string[]> {
    const url = this.generateUrl('symbols');

    return this.http.get<Symbols>(url)
      .pipe(
        map(response => Object.keys(response.symbols))
      );
  }

  convertCurrency(amount: number, from: string, to: string): Observable<CurrencyConversionResponse> {
    const url = this.generateUrl('convert', {from, to, amount});
    return this.http.get<CurrencyConversionResponse>(url);
  }

  getExchangeHistory(request: ExchangeHistoryRequest): Observable<ExchangeHistory> {
    const queryParams = { start_date: request.startDate, end_date:request.endDate};
    const url = this.generateUrl('timeseries', queryParams);

    return this.http.get<{ rates: object }>(url)
      .pipe(
        map(response => this.exchangeHistoryMapper.toModel(response, request.baseCurrency))
      );
  }

  private generateUrl(path: string, queryParams?: object): string {
    let url = `${ExchangeConstants.exchangeUrl}/${path}`;

    if (queryParams) {
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      url = `${url}?${queryString}`;
    }

    return url;
  }

}
