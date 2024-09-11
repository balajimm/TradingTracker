import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../helper.service';
import { StockTrack, DataPoint } from '../stock/stock.component'
import 'chartjs-adapter-date-fns';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  title = 'ng2-charts-demo';
  stockId: any;
  public stockTrack: StockTrack[] = [];
  //public chartLabels: string[] = [];
  //public chartData: any[] = [];
  public data: DataPoint[] = [];
/*  @Input() dataSource: { date: Date; value: number }[] = [];*/
 
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';
  public lineChartPlugins = [];
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService<StockTrack>) { }
  GetStockHistory(): void {
    this._helperService.getItem("StockTrack", this.stockId).subscribe(result => {
      this.stockTrack = result;
      this.data = this.stockTrack.map(item => ({
        date: new Date(this._helperService.formatDate(new Date(item.sharemarketDate))),
        value: Math.round(item.avgPrice)
      }));
      this.lineChartData = {
        labels: this.data.map(d => this._helperService.formatDate(d.date)), // Array of labels for the x-axis
        datasets: [
          {
            data: this.data.map(d => d.value), // Array of values for the line chart
            label: 'Sample Data',
            borderColor: '#3cba9f',
            backgroundColor: 'rgba(60, 186, 159, 0.2)',
            fill: true // Whether to fill under the line
          }
        ]
      };
    });
  }

      //subscribe(result => {
      //console.log(result);
      //this.stockTrack = result;
      //this.data = this.stockTrack.map(item => ({
      //  date: new Date(this._helperService.formatDate(new Date(item.sharemarketDate))),
      //  value: Math.round(item.avgPrice)
      //}));
      //this.lineChartData.labels = this.data.map(d => this._helperService.formatDate(d.date));
      //this.lineChartData.datasets[0].data = this.data.map(d => d.value);
      //this.lineChartData = {
      //  labels: this.data.map(d => this._helperService.formatDate(d.date)), // These will be populated with dates from the dataSource
      //  datasets: [
      //    {
      //      data: this.data.map(d => d.value), // These will be populated with values from the dataSource
      //      label: 'Values',
      //      backgroundColor: 'rgba(13, 110, 253, 0.5)', // Example color
      //      borderColor: 'rgba(63, 81, 181, 1)',
      //      borderWidth: 1
      //    }
      //  ]
      //};
      //this.barChartLabels = this.data.map(d => this._helperService.formatDate(d.date));
   // }, error => console.log(error));
 // }
  ngOnInit() {
    this.stockId = this.activatedRoute.snapshot.params["id"];
    this.GetStockHistory();
  }
}
