import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { HelperService } from '../helper.service';
import { StockTrack, DataPoint } from '../stock/stock.component'
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
  stockId: any;
  public stockTrack: StockTrack[] = [];
  //public chartLabels: string[] = [];
  //public chartData: any[] = [];
  public data: DataPoint[] = [];
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService) { }
  GetStockHistory(): void {
    this._helperService.getItem("StockTrack", this.stockId).subscribe(result => {
      console.log(result);
      this.stockTrack = result  ;
      this.data = this.stockTrack.map(item => ({
        date: new Date(this._helperService.formatDate(new Date(item.sharemarketDate))),
        value: Math.round(item.avgPrice)
      }));
      this.barChartData = {
        labels: this.data.map(d => this._helperService.formatDate(d.date)), // These will be populated with dates from the dataSource
            datasets: [
              {
                data: this.data.map(d => d.value), // These will be populated with values from the dataSource
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
  //title = 'ng2-charts-demo';
  //@Input() dataSource: { date: Date; value: number }[] = [];
  //formatDate(date: Date): string {
  //  const year = date.getFullYear();
  //  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
  //  const day = ('0' + date.getDate()).slice(-2);

  //  return `${year}/${month}/${day}`;
  //}
  ///*barChartData!: ChartData<'bar'>;*/
  //barChartOptions: ChartOptions<'bar'> = {
  //  scales: {
  //    y: {
  //      beginAtZero: true,
  //    },
  //  },
  //};
  //barChartPlugins!: any;
  //barChartLegend = true;
 

//of({
//  Private: 6,
//  data_1: 15,
//}) /* Replace this with the observable that you call the API */
//  .subscribe((resp) => {
//    this.apiResponse = resp;

//    this.barChartData = {
//      labels: ['Private', 'NASHA', 'NHIS', 'Others'],
//      datasets: [
//        {
//          data: [this.apiResponse?.Private, this.apiResponse?.data_1],
//          label: 'hey',
//          backgroundColor: ['#E8E2F4'],
//        },
//      ],
//    };
//  });
  //public barChartOptions: ChartOptions<'bar'> = {
  //  responsive: true,
  //  scales: {
  //    x: {
  //      type: 'time', // Use 'time' scale for the x-axis
  //      time: {
  //        unit: 'day', // Display dates by day
  //        tooltipFormat: 'MMM d, yyyy', // Tooltip format, corrected to use 'd'
  //        displayFormats: {
  //          day: 'MMM d' // Label format for days, corrected to use 'd'
  //        }
  //      },
  //      title: {
  //        display: true,
  //        text: 'Date'
  //      }
  //    },
  //    y: {
  //      title: {
  //        display: true,
  //        text: 'Value'
  //      },
  //      beginAtZero: true
  //    }
  //  }
  //};

  //public barChartType: ChartType = 'bar';
  //public barChartData: ChartData<'bar'> = {
  //  labels: [], // X-axis labels (dates)
  //  datasets: [{
  //    label: 'Values',
  //    data: [], // Y-axis data (values)
  //    backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //    borderColor: 'rgba(54, 162, 235, 1)',
  //    borderWidth: 1
  //  }]
  //};

//  private sampleData = [
//  { date: new Date('2024-09-01'), value: 10 },
//  { date: new Date('2024-09-02'), value: 20 },
//  { date: new Date('2024-09-03'), value: 30 }
//];

//  ngOnInit(): void {
   
//    this.updateChartData();
//    this.barChartData= {
//      labels: this.dataSource.map(d => d.date), // These will be populated with dates from the dataSource
//      datasets: [
//        {
//          data: this.dataSource.map(d => d.value), // These will be populated with values from the dataSource
//          label: 'Values',
//          backgroundColor: 'rgba(13, 110, 253, 0.5)', // Example color
//          borderColor: 'rgba(63, 81, 181, 1)',
//          borderWidth: 1
//        }
//      ]
//    };

//}
//ngOnChanges(changes: SimpleChanges): void {
//  if(changes['dataSource']) {
//  this.updateChartData();
//  //console.log("Bar chart comp");
//  //console.log(this.dataSource);
//  //console.log(this.sampleData);
//}
//  }
//  private updateChartData(): void {
//  this.barChartData.labels = this.dataSource.map(d => d.date);
//  this.barChartData.datasets[0].data = this.dataSource.map(d => d.value);
//  //console.log("barchart lable");
//  //console.log(this.barChartData.labels);
//  //console.log(this.barChartData.datasets[0].data);

//}
//  public barChartData: ChartData<'bar'> = {
//    labels: this.dataSource.map(d => d.date), // These will be populated with dates from the dataSource
//    datasets: [
//      {
//        data: this.dataSource.map(d => d.value), // These will be populated with values from the dataSource
//        label: 'Values',
//        backgroundColor: 'rgba(13, 110, 253, 0.5)', // Example color
//        borderColor: 'rgba(63, 81, 181, 1)',
//        borderWidth: 1
//      }
//    ]
//  };

  //public barChartOptions: ChartOptions<'bar'> = {
  //  responsive: true,
  //  scales: {
  //    x: {
  //      type: 'time', // Set x-axis type to 'time' for date-based data
  //      time: {
  //        unit: 'day', // Display date as day-level granularity
  //        tooltipFormat: 'MMM d, YYYY', // Format for tooltips
  //        displayFormats: {
  //          day: 'MMM d' // Format for x-axis labels
  //        }
  //      },
  //      title: {
  //        display: true,
  //        text: 'Date'
  //      }
  //    },
  //    y: {
  //      title: {
  //        display: true,
  //        text: 'Value'
  //      },
  //      beginAtZero: true
  //    }
  //  }
  //};

/*  public barChartType: ChartType = 'bar';*/
  //public barChartData: ChartData<'bar'> = {
  //  labels: [], // X-axis labels (dates)
  //  datasets: [{
  //    label: 'Values',
  //    data: [], // Y-axis data (values)
  //    backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //    borderColor: 'rgba(54, 162, 235, 1)',
  //    borderWidth: 1
  //  }]
  //};

  //public barChartType: 'bar' = 'bar';
  //ngOnInit(){
  //  this.updateChartData(this.dataSource);
  //}

  //ngOnChanges(changes: SimpleChanges): void {
  //  if (changes['dataSource'] && this.dataSource) {
  //    this.updateChartData(this.dataSource);
  //    console.log("Bar chart comp");
  //    console.log(this.dataSource);
  //  }
  //}

  //updateChartData(data: { date: Date; value: number }[]): void {
  //  //this.barChartData.labels = this.dataSource.map(d => d.date);
  //  //this.barChartData.datasets[0].data = this.dataSource.map(d => d.value);    
  //  this.barChartData.labels = this.dataSource.map(item => {
  //    const dateOptions: Intl.DateTimeFormatOptions = {
  //      year: 'numeric',
  //      month: 'short'
  //    };
  //    //const options = { year: 'numeric', month: 'short' };
  //    return new Intl.DateTimeFormat('en-US', dateOptions).format(item.date);
  //  });
  //  this.barChartData.datasets[0].data = this.dataSource.map(item => item.value);
  //  console.log(this.barChartData.labels);
  //  console.log(this.barChartData.datasets[0].data);
  //}
  //mapDataToChart(): void {
  //  // Convert date to string format (e.g., 'MMM YYYY') and extract values
  //  this.chartLabels = this.dataSource.map(item => {
  //    const dateOptions: Intl.DateTimeFormatOptions = {
  //      year: 'numeric',
  //      month: 'short'
  //    };
  //    //const options = { year: 'numeric', month: 'short' };
  //    return new Intl.DateTimeFormat('en-US', dateOptions).format(item.date);
  //  });

  //  this.chartData = [
  //    {
  //      data: this.data.map(item => item.value),
  //      label: 'Monthly Data'
  //    }
  //  ];
  //}
  //public barChartLegend = true;
  //public barChartPlugins = [];

  //public barChartData: ChartConfiguration<'bar'>['data'] = {
  //  labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //  datasets: [
  //    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  //  ]
  //};

  //public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //  responsive: false,
  //};

}
