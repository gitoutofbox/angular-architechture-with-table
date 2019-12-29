import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

import { ChartServiceService } from '../../services/chart-service.service';

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.sass']
})
export class DonutChartComponent implements OnInit {
  Highcharts = Highcharts;
  @Input() chartOptions: any;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() enable3d: boolean = true;
  @Input() data: any;
  @Input() showLegend: boolean = false;
  @Input() showDataLabels: boolean = true;

  constructor(private chartServiceService: ChartServiceService) { }

  ngOnInit() {    
    this.drawChart();    
  }

  drawChart() {
    let defaultOptions = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: this.enable3d,
          alpha: 45
        }
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subTitle
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
          dataLabels: {
            enabled: this.showDataLabels
        },
        showInLegend: this.showLegend
        }
      },
      legend:{
        enable3d: true
      },
      credits: {
        enabled: false
      },
      series: [{
        //name: 'Delivered amount',
        data: this.data
      }]
    };

    this.chartOptions = this.chartServiceService.deepMerge(defaultOptions, this.chartOptions);    
  }
}
