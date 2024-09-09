import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartEvent, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  title = 'ng2-charts-demo';
  @Input() dataSource: { date: Date; value: number }[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [], // These will be populated with dates from the dataSource
    datasets: [
      {
        data: [], // These will be populated with values from the dataSource
        label: 'Values',
        backgroundColor: 'rgba(13, 110, 253, 0.5)', // Example color
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time', // Set x-axis type to 'time' for date-based data
        time: {
          unit: 'day', // Display date as day-level granularity
          tooltipFormat: 'MMM d, YYYY', // Format for tooltips
          displayFormats: {
            day: 'MMM d' // Format for x-axis labels
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        },
        beginAtZero: true
      }
    }
  };

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

  public barChartType: 'bar' = 'bar';
  ngOnInit(){
    this.updateChartData(this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource) {
      this.updateChartData(this.dataSource);
      console.log("Bar chart comp");
      console.log(this.dataSource);
    }
  }

  updateChartData(data: { date: Date; value: number }[]): void {
    //this.barChartData.labels = this.dataSource.map(d => d.date);
    //this.barChartData.datasets[0].data = this.dataSource.map(d => d.value);    
    this.barChartData.labels = this.dataSource.map(item => {
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short'
      };
      //const options = { year: 'numeric', month: 'short' };
      return new Intl.DateTimeFormat('en-US', dateOptions).format(item.date);
    });
    this.barChartData.datasets[0].data = this.dataSource.map(item => item.value);
    console.log(this.barChartData.labels);
    console.log(this.barChartData.datasets[0].data);
  }
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
