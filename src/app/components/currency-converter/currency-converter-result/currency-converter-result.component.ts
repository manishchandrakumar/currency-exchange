import { Component, Input } from '@angular/core';
import { CurrencyConversionResponse } from "../../../core/services/exchange/interfaces/currency-conversion.response";

@Component({
  selector: 'app-currency-converter-result',
  templateUrl: './currency-converter-result.component.html',
  styleUrls: ['./currency-converter-result.component.scss']
})
export class CurrencyConverterResultComponent {

 @Input() conversionResult: CurrencyConversionResponse;

}
