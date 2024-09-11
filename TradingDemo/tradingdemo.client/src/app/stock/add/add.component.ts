import { Component, OnInit } from '@angular/core';
import { StockTrack } from '../stock.component'
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/helper.service'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public stock: StockTrack = {
    stockTrackId:0,
    stockId: 0,
    sharemarketDate: new Date(),
    openPrice: 0,
    closePrice: 0,
    highValue: 0,
    lowValue: 0,
    avgPrice: 0,
    volume: 0  

  };
  public stockId: any;

  public stockTrack: StockTrack[] = [];
  ngOnInit(): void {

    this.stockId = this.activatedRoute.snapshot.params["id"];
    

  }

  constructor(private activatedRoute: ActivatedRoute, private _helperService: HelperService<StockTrack>) { }
  add(): void {
    this._helperService.addItem("stocktrack",this.stock).subscribe(() => {
      alert("Added Successfully...");
    });
  }

}
