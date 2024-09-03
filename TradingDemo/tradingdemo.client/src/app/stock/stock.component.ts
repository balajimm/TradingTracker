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
  public stock: any;
  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService) { }
  ngOnInit(): void {
    this.stockId = this.activatedRoute.snapshot.params["id"];
    this._helperService.getItem("stock", this.stockId).subscribe(result => {
      console.log(result);
      this.stock = result;
    }, error => console.log(error));
  }
  // Method to get the keys of the object
  getKeys(obj: any): string[] {
    return Object.keys(obj);
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
