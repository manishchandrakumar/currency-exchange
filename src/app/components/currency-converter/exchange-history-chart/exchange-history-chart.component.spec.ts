import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ConversionInputInterface } from '../../../core/services/exchange/interfaces/conversion-input.interface';
import { ExchangeHistory } from '../../../core/services/exchange/interfaces/exchange-history.interface';
import { ExchangeHistoryChartComponent } from './exchange-history-chart.component';
import { SimpleChanges } from '@angular/core';

describe('ExchangeHistoryChartComponent', () => {
  let component: ExchangeHistoryChartComponent;
  let fixture: ComponentFixture<ExchangeHistoryChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeHistoryChartComponent]
    });
    fixture = TestBed.createComponent(ExchangeHistoryChartComponent);
    component = fixture.componentInstance;
    createChartElement();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw chart when exchangeHistory is set', fakeAsync(() => {
    const conversionRequest: ConversionInputInterface = { from: 'USD', to: 'EUR', amount: 1 };
    const exchangeHistory = {
      history: [
        { date: '2023-01-13', rate: '0.9' },
        { date: '2023-01-12', rate: '0.8' }
      ]
    } as ExchangeHistory;
    const changes = {exchangeHistory} as unknown as SimpleChanges
    component.conversionRequest = conversionRequest;
    component.exchangeHistory = exchangeHistory;
    component.ngOnChanges(changes);
    fixture.detectChanges();
    tick(10);
    expect(component.chartContainer.nativeElement.innerHTML).not.toBe('');
    Zone.current.get('FakeAsyncTestZoneSpec').pendingTimers = [];
  }));

  it('should not draw chart when exchangeHistory is not set', () => {
    component.exchangeHistory = null;
    fixture.detectChanges();
    expect(component.chartContainer.nativeElement.innerHTML).toBe('');
  });

  function createChartElement() {
    const element = document.createElement('div')
    element.innerHTML = '<div #currencyChart class="history-chart"></div>';
    document.body.appendChild(element);
  }
});
