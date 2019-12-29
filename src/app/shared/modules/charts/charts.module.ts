import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

@NgModule({
  declarations: [ScatterChartComponent, DonutChartComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    ScatterChartComponent,
    DonutChartComponent
  ]
})
export class ChartsModule { }
