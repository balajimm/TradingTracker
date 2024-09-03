import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockId:any;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.stockId = this.activatedRoute.snapshot.params["id"];
  }

}
