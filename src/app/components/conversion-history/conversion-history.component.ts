import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeConstants } from 'src/app/core/services/exchange/constants/exchange.constants';
import { ConversionHistory } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent {

  displayedConversionHistoryColumns = ['date', 'event', 'actions'];
  conversionHistoryData: ConversionHistory[];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  get conversionHistory(): ConversionHistory[] {
    const history = this.storageService.getStorage(ExchangeConstants.HisoryStorageKey) as ConversionHistory[];
    return history && history.reverse();
  }

  onViewConversionHistory(history: ConversionHistory): void {
    this.router.navigate(['convert'], {
      queryParams: {
        amount: history.amount,
        from: history.fromCurrency,
        to: history.toCurrency
      }
    });
  }

  onDeleteConversionHistory(id: number): void {
    const history = this.conversionHistory;

    if (history?.length) {
      const filteredHistory = history.filter(h => h.id !== id);
      this.storageService.setStorage(ExchangeConstants.HisoryStorageKey, filteredHistory);
    }
  }

}
