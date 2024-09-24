import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper.service';

interface Stocks {
  stockId: any;
  stockName: string;
  stockCode: string;
  sector: string;
  captial: any;

  divdentYield: any;

  lowValue: any;
  highValue: any;
  analysisPrice: any;

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
  constructor(private _helperService: HelperService<Stocks>) {    
  }
  ngOnInit() {
    this._helperService.getItems("stocks").subscribe(result => {
      console.log(result);
      this.stocksdata = result;
    }, error => console.log(error));
   } 
}

