import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { HelperService } from '../helper.service';
import { StockTrack, DataPoint, HistoricalDetails, getSumOfDaysAgo } from '../stock/stock.component'
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public barChartLabels: string[] = [];
  public barChartOptions: any = {
    responsive: true
  };
  public barChartLegend = true;
  public barChartType = 'bar';
  public barChartPlugins = [];
  public histroyData: HistoricalDetails[] = [];
  stockId: any;
  public stockTrack: StockTrack[] = [];
  //public chartLabels: string[] = [];
  //public chartData: any[] = [];
  public data: DataPoint[] = [];
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService<StockTrack>) { }
  GetStockHistory(): void {
    this._helperService.getItem("StockTrack", this.stockId).subscribe(result => {
      console.log(result);
      this.stockTrack = result;

      this.data = this.stockTrack.map(item => ({
        date: new Date(this._helperService.formatDate(new Date(item.sharemarketDate))),
        value: Math.round(item.avgPrice)
      }));
      for (let i = 30; i <= 1080; i = i + 30) {
        this.histroyData.push(getSumOfDaysAgo(this.data, i));
      }    
      this.barChartData = {
        labels: this.histroyData.map(d => d.month), // These will be populated with dates from the dataSource
            datasets: [
              {
                data: this.histroyData.map(d => d.value), // These will be populated with values from the dataSource
                label: 'Values',
                backgroundColor: 'rgba(13, 110, 253, 0.5)', // Example color
                borderColor: 'rgba(63, 81, 181, 1)',
                borderWidth: 1
              }
            ]
          };
      this.barChartLabels = this.data.map(d => this._helperService.formatDate(d.date)) ; 
    }, error => console.log(error));
  }
  
  ngOnInit() {
    this.stockId = this.activatedRoute.snapshot.params["id"];
    this.GetStockHistory();   
  }  
}
