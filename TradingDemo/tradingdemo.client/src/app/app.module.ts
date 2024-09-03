import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { AppRoutingModule } from './app-routing.module';
import { HoldingsComponent } from './holdings/holdings.component';
import { StockComponent } from './stock/stock.component';
import { HelperService } from './helper.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StocksComponent,
    HoldingsComponent,
    StockComponent,
    
   
  ],
  imports: [
    BrowserModule, HttpClientModule, 
    RouterModule.forRoot([      
      { path: 'stocks', component: StocksComponent },
      { path: 'stocks/stock/:id', component: StockComponent },
    ]), AppRoutingModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
