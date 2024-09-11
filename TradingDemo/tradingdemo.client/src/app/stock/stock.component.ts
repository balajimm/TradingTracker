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
  public data : DataPoint[] = [];
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
      this.stockTrack = result.slice(0, 5);
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

   
    // Convert date to string format (e.g., 'MMM YYYY') and extract values
    //this.chartLabels = this.stockTrack.map(item => {
    //  const dateOptions: Intl.DateTimeFormatOptions = {
    //    year: 'numeric',
    //    month: 'short'
    //  };
    //  //const options = { year: 'numeric', month: 'short' };
    //  return new Intl.DateTimeFormat('en-US', dateOptions).format(item.sharemarketDate);
    //});

    //this.chartData = [
    //  {
    //    data: this.stockTrack.map(item => item.avgPrice),
    //    label: 'Monthly Data'
    //  }
    //];

    this.data = this.stockTrack.map(item => ({
      date: new Date(this.formatDate(new Date(item.sharemarketDate))),
      value: Math.round(item.avgPrice)
    }));
    console.log("chart data");
    console.log(this.data);
  }  
 
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
