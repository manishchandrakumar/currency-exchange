import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as moment from 'moment';
import { ExchangeHistoryRequest } from 'src/app/core/services/exchange/interfaces/exchange-history.interface';
import { ExchangeHistoryComponent } from './exchange-history.component';

describe('ExchangeHistoryComponent', () => {
  let component: ExchangeHistoryComponent;
  let fixture: ComponentFixture<ExchangeHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeHistoryComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ExchangeHistoryComponent', () => {

    it('should emit the exchangeHisoryRequest event when onSelectedDuration is called', () => {
      spyOn(component.exchangeHisoryRequest, 'emit');
      component.onSelectedDuration();
      expect(component.exchangeHisoryRequest.emit).toHaveBeenCalled();
    });

    it('should emit the correct data in the exchangeHisoryRequest event when onSelectedDuration is called', () => {
      spyOn(component.exchangeHisoryRequest, 'emit');
      component.baseCurrency = 'EUR';
      component.onSelectedDuration();

      const today = moment('2023-02-04').toDate();
      jasmine.clock().mockDate(today);

      const exchangeHistoryRequest = {
        startDate: '2023-02-04',
        endDate: '2023-02-11',
        baseCurrency: 'EUR'
      } as ExchangeHistoryRequest;
      expect(component.exchangeHisoryRequest.emit).toHaveBeenCalledWith(exchangeHistoryRequest);
    });
  });


});
