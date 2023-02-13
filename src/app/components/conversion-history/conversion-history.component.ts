import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeConstants } from 'src/app/core/services/exchange/constants/exchange.constants';
import { ConversionHistory } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionHistoryComponent {

  conversionHistoryColumns = ExchangeConstants.ConversionHistoryColumns;
  conversionHistoryData: ConversionHistory[];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  get conversionHistory(): ConversionHistory[] {
    const history = this.storageService.getStorage(ExchangeConstants.HistoryStorageKey) as ConversionHistory[];
    return history && history.reverse();
  }

  viewConversionHistory(history: ConversionHistory): void {
    const { amount, fromCurrency: from, toCurrency: to} = history;
    const queryParams = { amount, from , to};

    this.router.navigate(['convert'], { queryParams });
  }

  deleteConversionHistory(id: number): void {
    const history = this.conversionHistory;

    if (history?.length) {
      const filteredHistory = history.filter(history => history.id !== id);
      this.storageService.setStorage(ExchangeConstants.HistoryStorageKey, filteredHistory);
    }
  }

}
