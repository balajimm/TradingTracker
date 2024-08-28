import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
 // public stocksdata: Stocks[] = [];

  //constructor(private http: HttpClient) { }

  //ngOnInit() {
  //  this.getForecasts();
  //}

  //getForecasts() {
  //  this.http.get<Stocks[]>('/stock').subscribe(
  //    (result) => {
  //      this.stocksdata = result;
  //    },
  //    (error) => {
  //      console.error(error);
  //    }
  //  );
  //}

  title = 'tradingdemo.client';
  public stocksdata: Stocks[] = [];
  public baseURL = "";
  constructor(private http: HttpClient) {
    this.baseURL = "https://localhost:7117/api/";
  }
  ngOnInit() {
    this.getStocks();
  }
  
  getStocks() {
    this.http.get<Stocks[]>(this.baseURL +'stock').subscribe(result => {
      console.log(result);
      this.stocksdata = result;
    }, error => console.log(error));
  }
   
 
}

