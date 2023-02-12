import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ConversionHistoryComponent } from './conversion-history.component';
import { ConversionHistory } from 'src/app/core/services/exchange/interfaces/conversion-input.interface';

describe('ConversionHistoryComponent', () => {
  let component: ConversionHistoryComponent;
  let fixture: ComponentFixture<ConversionHistoryComponent>;
  let storageServiceSpy;
  let router: Router;

  const conversionHistory = getMockCOnversionHistory();

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getStorage', 'setStorage']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ConversionHistoryComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: router },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConversionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('conversionHistory', () => {
    it('should get conversion history from storage', () => {
      storageServiceSpy.getStorage.and.returnValue(conversionHistory);

      expect(component.conversionHistory).toEqual(conversionHistory.reverse());
    });
  });

  describe('onViewConversionHistory', () => {
    it('should navigate to conversion page on view history', () => {
      component.viewConversionHistory(conversionHistory[0]);

      expect(router.navigate).toHaveBeenCalledWith(['convert'], {
        queryParams: {
          amount: conversionHistory[0].amount,
          from: conversionHistory[0].fromCurrency,
          to: conversionHistory[0].toCurrency
        }
      });
    });
  });

  describe('onDeleteConversionHistory', () => {
    it('should delete conversion history from storage', () => {
      storageServiceSpy.getStorage.and.returnValue(conversionHistory);

      component.deleteConversionHistory(0);

      expect(storageServiceSpy.setStorage).toHaveBeenCalled();
    });
  });

  function getMockCOnversionHistory() {
    return [
      {
        id: 1,
        conversionDate: '2023-02-11',
        conversionTime: '4:00',
        amount: 1,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      },
      {
        id: 2,
        conversionDate: '2023-02-11',
        conversionTime: '4:15',
        amount: 2,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      }
    ];
  }

});
