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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';
import { ExchangeHistoryChartComponent } from './exchange-history-chart/exchange-history-chart.component';
import { MatRadioModule } from '@angular/material/radio';
import { ExchangeHistoryTableComponent } from './exchange-history-table/exchange-history-table.component';

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
    ExchangeHistoryComponent,
    ExchangeHistoryChartComponent,
    ExchangeHistoryTableComponent
  ],
    exports: [
        CurrencyConverterInputComponent,
        CurrencyConverterResultComponent,
        ExchangeHistoryComponent,
        RouterModule,
        ExchangeHistoryChartComponent
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
        HttpClientModule,
        MatRadioModule,
        FormsModule
    ]
})
export class CurrencyConverterModule {
}
