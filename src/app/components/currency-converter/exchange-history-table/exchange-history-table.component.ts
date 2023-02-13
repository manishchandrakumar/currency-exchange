import { Component, Input, OnInit } from '@angular/core';
import { ExchangeConstants } from '../../../core/services/exchange/constants/exchange.constants';
import { ExchangeHistory } from '../../../core/services/exchange/interfaces/exchange-history.interface';

@Component({
  selector: 'app-exchange-history-table',
  templateUrl: './exchange-history-table.component.html',
  styleUrls: ['./exchange-history-table.component.scss']
})
export class ExchangeHistoryTableComponent {

  @Input() exchangeHistory: ExchangeHistory;

  exchangeHistoryColumns = ExchangeConstants.exchangeHistoryColumns;
  exchangeStatisticsColumns = ExchangeConstants.exchangeStatisticsColumns;

}
