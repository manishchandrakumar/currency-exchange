import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
// @ts-ignore
import * as anychart from 'anychart';
import { ExchangeHistory } from '../../../core/services/exchange/interfaces/exchange-history.interface';
import { ConversionInputInterface } from '../../../core/services/exchange/interfaces/conversion-input.interface';

@Component({
    selector: 'app-exchange-history-chart',
    templateUrl: './exchange-history-chart.component.html',
    styleUrls: ['./exchange-history-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeHistoryChartComponent implements OnChanges {

    @Input() conversionRequest: ConversionInputInterface;
    @Input() exchangeHistory: ExchangeHistory;
    @ViewChild('currencyChart', {static: true}) chartContainer: ElementRef;

    ngOnChanges(changes: SimpleChanges) {
        if (changes && this.exchangeHistory?.history?.length) {
            this.chartContainer.nativeElement.innerHTML = '';
            const exchangeData = this.exchangeHistory.history.reverse();
            this.drawChart(exchangeData);
        }
    }

    private drawChart(data: object[]): void {
        anychart.onDocumentReady(() => this.configureChart(data));
    }

    private configureChart(data: object[]) {
        const {from, to} = this.conversionRequest;
        const table = anychart.data.table('date');

        table.addData(JSON.parse((JSON.stringify(data))));
        const mapping = table.mapAs({x: 'date', value: 'rate'});
        const chart = anychart.stock();

        const series = chart.plot(0).line(mapping);
        series.stroke('2 #009688');
        series.name(`${from} to ${to} Rate`);
        chart.container(this.chartContainer.nativeElement);
        chart.draw();
    }
}
