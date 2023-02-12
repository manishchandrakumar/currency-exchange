import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ExchangeConstants } from './constants/exchange.constants';
import { CurrencyConversionResponse } from './interfaces/currency-conversion.response';
import { ExchangeHistoryMapperService } from './mappers/exchange-history.mapper.service';
import { ExchangeHistory, ExchangeHistoryRequest } from './interfaces/exchange-history.interface';
import { Symbols } from './interfaces/symbol.interface';
import { Observable } from 'rxjs';
import { ExchangeApiEndpoints } from './enums/exchange-endpoints.enum';
import { ConversionInputInterface } from './interfaces/conversion-input.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  constructor(
    private http: HttpClient,
    private exchangeHistoryMapper: ExchangeHistoryMapperService
  ) {}

  getSymbols(): Observable<string[]> {
    const url = this.getUrlWithQueryParam(ExchangeApiEndpoints.SYMBOLS);

    return this.http.get<Symbols>(url)
      .pipe(
        map(response => Object.keys(response.symbols))
      );
  }

  convertCurrency(request: ConversionInputInterface): Observable<CurrencyConversionResponse> {
    const url = this.getUrlWithQueryParam(ExchangeApiEndpoints.CONVERT, {...request});
    return this.http.get<CurrencyConversionResponse>(url);
  }

  getExchangeHistory(request: ExchangeHistoryRequest): Observable<ExchangeHistory> {
    const queryParams = { start_date: request.startDate, end_date:request.endDate, base: request.from};
    const url = this.getUrlWithQueryParam(ExchangeApiEndpoints.TIMESERIES, queryParams);

    return this.http.get<{ rates: object }>(url)
      .pipe(
        map(response => this.exchangeHistoryMapper.toModel(response, request.to))
      );
  }

  private getUrlWithQueryParam(path: string, queryParams?: object): string {
    const queryString = queryParams ?
        Object.keys(queryParams)
            .map(key => `${key}=${queryParams[key]}`)
            .join('&')
        : '';

    return `${ExchangeConstants.exchangeUrl}/${path}${queryString ? `?${queryString}` : ''}`;
  }

}
