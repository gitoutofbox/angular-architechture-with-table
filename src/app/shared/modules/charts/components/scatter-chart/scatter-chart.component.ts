import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { ChartServiceService } from '../../services/chart-service.service';
highcharts3D(Highcharts);

@Component({
  selector: 'scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.sass']
})
export class ScatterChartComponent implements OnInit {

  Highcharts = Highcharts;
  @Input() chartOptions: any;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() enable3d: boolean = true;
  @Input() data: any;
  @Input() showLegend: boolean = false;
  @Input() showDataLabels: boolean = true;

  dummyData: any = [
    [1, 6, 5], [8, 7, 9], [1, 3, 4], [4, 6, 8], [5, 7, 7], [6, 9, 6],
    [7, 0, 5], [2, 3, 3], [3, 9, 8], [3, 6, 5], [4, 9, 4], [2, 3, 3],
    [6, 9, 9], [0, 7, 0], [7, 7, 9], [7, 2, 9], [0, 6, 2], [4, 6, 7],
    [3, 7, 7], [0, 1, 7], [2, 8, 6], [2, 3, 7], [6, 4, 8], [3, 5, 9],
    [7, 9, 5], [3, 1, 7], [4, 4, 2], [3, 6, 2], [3, 1, 6], [6, 8, 5],
    [6, 6, 7], [4, 1, 1], [7, 2, 7], [7, 7, 0], [8, 8, 9], [9, 4, 1],
    [8, 3, 4], [9, 8, 9], [3, 5, 3], [0, 2, 4], [6, 0, 2], [2, 1, 3],
    [5, 8, 9], [2, 1, 1], [9, 7, 6], [3, 0, 2], [9, 9, 0], [3, 4, 8],
    [2, 6, 1], [8, 9, 2], [7, 6, 5], [6, 3, 1], [9, 3, 1], [8, 9, 3],
    [9, 1, 0], [3, 8, 7], [8, 0, 0], [4, 9, 7], [8, 6, 2], [4, 3, 0],
    [2, 3, 5], [9, 1, 4], [1, 1, 4], [6, 0, 2], [6, 1, 6], [3, 8, 8],
    [8, 8, 7], [5, 5, 0], [3, 9, 6], [5, 4, 3], [6, 8, 3], [0, 1, 5],
    [6, 7, 3], [8, 3, 2], [3, 8, 3], [2, 1, 6], [4, 6, 7], [8, 9, 9],
    [5, 4, 2], [6, 1, 3], [6, 9, 5], [4, 8, 2], [9, 7, 4], [5, 4, 2],
    [9, 6, 1], [2, 7, 3], [4, 5, 4], [6, 8, 1], [3, 4, 0], [2, 2, 6],
    [5, 1, 2], [9, 9, 7], [6, 9, 9], [8, 4, 3], [4, 1, 7], [6, 2, 5],
    [0, 4, 9], [3, 5, 9], [6, 9, 1], [1, 9, 2]];
  
    constructor(private chartServiceService: ChartServiceService) { }

  ngOnInit() {
    this.drawChart();
  }
  drawChart() {
    let defaultOptions = {
      chart: {
        type: 'scatter',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      legend: {
        enabled: this.showLegend
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subTitle
      },
      credits: {
        enabled: false
      },
      series: [{
        data: this.data ? this.data : this.dummyData
      }]
    };
    this.chartOptions = this.chartServiceService.deepMerge(defaultOptions, this.chartOptions);    
  }
}
