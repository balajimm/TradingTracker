import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})


export class StockComponent implements OnInit {
  stockId: any;
  public stock:Partial<Stocks> = {};
  public stockTrack: StockTrack[]=[];
  public data: DataPoint[] = [];
  
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService<StockTrack>) { }
  ngOnInit(): void {
    
    this.stockId = this.activatedRoute.snapshot.params["id"];
    this._helperService.getItem("stock", this.stockId).subscribe(result => {
      console.log(result);
      this.stock = result;
    }, error => console.log(error));
    this.GetStockHistory();
    
  }
  GetStockHistory(): void {
    this._helperService.getItem("StockTrack", this.stockId).subscribe(result => {
      console.log(result);
      this.stockTrack = result;
      this.mapDataToChart();
    }, error => console.log(error));
  }
  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "2024/09/09";
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}/${month}/${day}`;
  }
  
  mapDataToChart(): void {  
    this.data = this.stockTrack.map(item => ({
      date: new Date(this.formatDate(new Date(item.sharemarketDate))),
      value: Math.round(item.avgPrice)
    }));
     
    console.log("chart data");
 
    console.log(this.data);
  }  
 
}
export interface HistoricalDetails {
  month: string; // Format: "YYYY-MM"
  value: number; // Result value for that month
}
interface Stocks {

  stockId: any;
  stockName: string;
  stockCode: string;
  sector: string;
  captial: any;
  eps: any;
  priceEarn: any;
  pirceBook: any;
  divdentYield: any;
  roe: any;
  lowValue: any;
  highValue: any;
  analysisPrice: any;
  createdBy: any;
  createdOn: string;
  updatedBy: any;
  updatedOn: string;

}
export interface StockTrack {
  stockTrackId: any;
  stockId: any;
  sharemarketDate: Date;
  lowValue: any;
  highValue: any;
  openPrice: any;
  closePrice: any;
  avgPrice: any;
  volume: any;
}
export interface DataPoint {
  date: Date;
  value: number;
}
export function reverseOrderByDate(entries: DataPoint[]): DataPoint[] {
  return entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();
}
export function getMonthName(date: Date): string {
  const monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  // Get the month index (0-11) and return the corresponding month name
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
}
export function getSumOfDaysAgo(data: DataPoint[], days: number): HistoricalDetails {
  var tempData = [...data];
  var historicalDetails: HistoricalDetails = { month: "", value: 0 };
  const now = new Date();
  const DaysAgo = new Date(now);
  DaysAgo.setDate(now.getDate() - days);
  tempData = tempData.filter(entry => new Date(entry.date) >= DaysAgo);
  const recordCount = tempData.length;
  historicalDetails.month = DaysAgo.getFullYear() + " " + getMonthName(DaysAgo) + " " + DaysAgo.getDate();
  historicalDetails.value = formatToTwoDecimals(tempData.reduce((sum, entry) => sum + entry.value, 0) / recordCount);  
  return historicalDetails;
}
export function formatToTwoDecimals(value: number): number {
  return parseFloat(value.toFixed(2));
}
