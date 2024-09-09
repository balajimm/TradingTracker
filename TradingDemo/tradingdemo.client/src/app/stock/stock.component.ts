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
  //public chartLabels: string[] = [];
  //public chartData: any[] = [];
  public data : DataPoint[] = [];
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService) { }
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
      date: new Date(item.sharemarketDate),
      value: item.avgPrice
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
interface StockTrack {
  stockTrackId: any;
  stockId: any;
  sharemarketDate: Date;
  lowValue: any;
  highValue: any;
  openPrice: any;
  closePrice: any;
  avgPrice: any;
  volume: any;
  stock: any;
}
interface DataPoint {
  date: Date;
  value: number;
}
