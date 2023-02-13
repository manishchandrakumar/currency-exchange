import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';

@Component({
  selector: 'app-currency-converter-input',
  templateUrl: './currency-converter-input.component.html',
  styleUrls: ['./currency-converter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterInputComponent implements OnInit, OnChanges {

  @Input() currencies: string[];
  @Input() conversionRequest: ConversionInputInterface;
  @Output() conversionInput = new EventEmitter<ConversionInputInterface>();

  filteredFromCurrencies: Observable<string[]>;
  filteredToCurrencies: Observable<string[]>;
  currencyConversionForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) { return; }
    this.autoPopulateCurrencies();
    this.setConversionRequestFromQueryParam();
  }

  handleSubmit(): void {
    this.conversionInput.emit(this.currencyConversionForm?.value);
  }

  swapCurrency(): void {
    this.currencyConversionForm.patchValue({
      from: this.currencyConversionForm.get('to').value,
      to: this.currencyConversionForm.get('from').value
    })
  }

  private initForm(): void {
    this.currencyConversionForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required)
    });
  }

  private autoPopulateCurrencies(): void {
    if(!this.currencyConversionForm?.controls) { return; }
    const {to, from} = this.currencyConversionForm?.controls;
    this.filteredFromCurrencies = this.filterCurrencyInput(from);
    this.filteredToCurrencies = this.filterCurrencyInput(to);
  }

  private filterCurrencyInput(formControl: AbstractControl): Observable<string[]> {
    return formControl?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCurrency(value || '')),
    );
  }

  private setConversionRequestFromQueryParam(): void {
    if(!this.conversionRequest) { return; }
    this.currencyConversionForm?.patchValue({...this.conversionRequest});
  }

  private filterCurrency(value: string): string[] {
    return this.currencies?.filter(currency => currency.toLowerCase().includes(value.toLowerCase()));
  }

}
