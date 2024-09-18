import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../helper.service';
import { StockTrack, DataPoint, HistoricalDetails, getSumOfDaysAgo, reverseOrderByDate } from '../stock/stock.component'
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
  public histroyData: HistoricalDetails[] = [];
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
      console.log("Sort order");
      console.log(this.data);
      console.log(reverseOrderByDate(this.data));
      this.data = reverseOrderByDate(this.data);
      console.log(this.data);
      for (let i = 5; i <= 450; i = i + 5) {
        this.histroyData.push(getSumOfDaysAgo(this.data, i));
      }    
      this.lineChartData = {
        labels: this.histroyData.map(d => d.month).reverse(), // Array of labels for the x-axis
        datasets: [
          {
            data: this.histroyData.map(d => d.value).reverse(), // Array of values for the line chart
            label: 'Sample Data',
            borderColor: '#3cba9f',
            backgroundColor: 'rgba(60, 186, 159, 0.2)',
            fill: true // Whether to fill under the line
          }
        ]
      };
    });
  }  
  ngOnInit() {
    this.stockId = this.activatedRoute.snapshot.params["id"];
    this.GetStockHistory();
  }
}
