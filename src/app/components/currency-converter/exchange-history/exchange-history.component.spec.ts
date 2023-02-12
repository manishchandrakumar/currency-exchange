import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConversionInputInterface } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';
import { ExchangeHistoryComponent } from './exchange-history.component';

describe('ExchangeHistoryComponent', () => {
  let component: ExchangeHistoryComponent;
  let fixture: ComponentFixture<ExchangeHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeHistoryComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set default selected duration', () => {
      spyOn(component, 'selectDuration');
      fixture.detectChanges();
      expect(component.selectedDuration).toBe('7');
    });
  });

  describe('ExchangeHistoryComponent', () => {

    it('should emit the correct data in the exchangeHisoryRequest event when onSelectedDuration is called', () => {
      const conversionRequest: ConversionInputInterface = {
        amount: 100,
        from: 'EUR',
        to: 'INR'
      };

      component.conversionRequest = conversionRequest;

      spyOn(component.exchangeHisoryRequest, 'emit');
      component.selectDuration();

      expect(component.exchangeHisoryRequest.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        from: 'EUR',
        to: 'INR'
      }));
    });
  });

});
