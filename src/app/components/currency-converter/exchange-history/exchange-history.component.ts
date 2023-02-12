import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ExchangeConstants } from 'src/app/core/services/exchange/constants/exchange.constants';
import { ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { ExchangeHistory, ExchangeHistoryRequest } from 'src/app/core/services/exchange/interfaces/exchange-history.interface';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeHistoryComponent implements OnInit {

  @Input() conversionRequest: ConversionInputInterface;
  @Input() exchangeHistory: ExchangeHistory;
  @Output() exchangeHisoryRequest = new EventEmitter<ExchangeHistoryRequest>();

  selectedDuration = ExchangeConstants.ExchangeHistoryDefaultDuration;
  exhangeHistoryColumns = ExchangeConstants.exhangeHistoryColumns;
  exhangeStatisticsColumns = ExchangeConstants.exhangeStatisticsColumns;

  ngOnInit(): void {
    this.selectDuration();
  }

  selectDuration(): void {
    const startDate = moment().subtract(this.selectedDuration, 'd').format(ExchangeConstants.DefaultDateFormat);
    const endDate = moment().format(ExchangeConstants.DefaultDateFormat);
    const {from, to} = this.conversionRequest;

    this.exchangeHisoryRequest.emit({startDate, endDate, from, to});
  }
}
