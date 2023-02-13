import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyConversionResponse } from '../../../core/services/exchange/interfaces/currency-conversion.response';

@Component({
  selector: 'app-currency-converter-result',
  templateUrl: './currency-converter-result.component.html',
  styleUrls: ['./currency-converter-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterResultComponent {

 @Input() conversionResult: CurrencyConversionResponse;

}
