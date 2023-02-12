import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyConverterModule } from './components/currency-converter/currency-converter.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export const routes: Routes = [
  {
    path: 'convert',
    loadChildren: () => import('./components/currency-converter/currency-converter.module').then(m => m.CurrencyConverterModule)
  },
  { path: 'history', component: ConversionHistoryComponent },
  {
    path: '**',
    redirectTo: 'convert',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ConversionHistoryComponent,
    CurrencyConverterComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    SharedModule,
    CurrencyConverterModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    CurrencyConverterModule
  ]
})
export class AppModule { }
