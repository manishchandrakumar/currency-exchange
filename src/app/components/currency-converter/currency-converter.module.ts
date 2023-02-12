import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterInputComponent } from './currency-converter-input/currency-converter-input.component';
import { CurrencyConverterResultComponent } from './currency-converter-result/currency-converter-result.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';

const routes: Routes = [
  {
    path: 'convert',
    component: CurrencyConverterComponent
  }
];

@NgModule({
  declarations: [
    CurrencyConverterInputComponent,
    CurrencyConverterResultComponent,
    ExchangeHistoryComponent
  ],
  exports: [
    CurrencyConverterInputComponent,
    CurrencyConverterResultComponent,
    ExchangeHistoryComponent,
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CurrencyConverterModule {
}
