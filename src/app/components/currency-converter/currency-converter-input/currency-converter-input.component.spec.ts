import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { CurrencyConverterInputComponent } from './currency-converter-input.component';

describe('CurrencyConverterInputComponent', () => {
  let component: CurrencyConverterInputComponent;
  let fixture: ComponentFixture<CurrencyConverterInputComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      declarations: [CurrencyConverterInputComponent],
      providers: [
        { provide: 'Window', useValue: window }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CurrencyConverterInputComponent);
    component = fixture.componentInstance;
    component.currencies = ['USD', 'EUR', 'GBP'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize form on ngOnInit', () => {
      component.ngOnInit();
      expect(component.currencyConversionForm).toBeTruthy();
      expect(component.currencyConversionForm.get('amount')).toBeTruthy();
      expect(component.currencyConversionForm.get('from')).toBeTruthy();
      expect(component.currencyConversionForm.get('to')).toBeTruthy();
    });

  });

  describe('ngOnChanges', () => {

    it('should auto-populate currencies on ngOnChanges', () => {
      component.ngOnChanges({});
      expect(component.filteredFromCurrencies).toBeTruthy();
      expect(component.filteredToCurrencies).toBeTruthy();
    });

    it('should initialize the form with the conversion request', () => {
      const conversionRequest: ConversionInputInterface = {
        amount: 100,
        from: 'USD',
        to: 'EUR'
      };
      component.conversionRequest = conversionRequest;
      component.ngOnChanges({});
      expect(component.currencyConversionForm.value).toEqual(conversionRequest);
    });

  });

  describe('handleSubmit', () => {
    it('should handle form submit', () => {
      component.currencyConversionForm.patchValue({
        amount: 1,
        from: 'USD',
        to: 'EUR'
      });
      const spy = spyOn(component.conversionInput, 'emit');
      component.handleSubmit();
      expect(spy).toHaveBeenCalledWith(component.currencyConversionForm.value);
    });

    it('should emit the form value on handleSubmit', () => {
      const conversionRequest: ConversionInputInterface = {
        amount: 100,
        from: 'USD',
        to: 'EUR'
      };
      component.currencyConversionForm.patchValue(conversionRequest);
      spyOn(component.conversionInput, 'emit');
      component.handleSubmit();
      expect(component.conversionInput.emit).toHaveBeenCalledWith(conversionRequest);
    });
  });

  it('should emit conversionInput event on submit', () => {
    spyOn(component.conversionInput, 'emit');
    component.currencyConversionForm.patchValue({
      amount: 100,
      from: 'USD',
      to: 'EUR',
    });
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();

    expect(component.conversionInput.emit).toHaveBeenCalledWith({
      amount: 100,
      from: 'USD',
      to: 'EUR',
    });
  });

  describe('swapCurrency', () => {
    it('should swap currencies', () => {
      component.ngOnInit();
      component.currencyConversionForm.patchValue({
        amount: 1,
        from: 'USD',
        to: 'EUR'
      });
      component.swapCurrency();
      expect(component.currencyConversionForm.get('from').value).toEqual('EUR');
      expect(component.currencyConversionForm.get('to').value).toEqual('USD');
    });
  });

});
