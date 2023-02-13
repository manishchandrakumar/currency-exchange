import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeHistoryTableComponent } from './exchange-history-table.component';

describe('ExchangeHistoryTableComponent', () => {
  let component: ExchangeHistoryTableComponent;
  let fixture: ComponentFixture<ExchangeHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
