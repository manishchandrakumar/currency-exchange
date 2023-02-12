import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterResultComponent } from './currency-converter-result.component';

describe('CurrencyConverterResultComponent', () => {
  let component: CurrencyConverterResultComponent;
  let fixture: ComponentFixture<CurrencyConverterResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
