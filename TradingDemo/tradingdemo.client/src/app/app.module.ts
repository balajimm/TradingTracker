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
import { BaseChartDirective } from 'ng2-charts'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AddComponent } from './stock/add/add.component';
import { FormsModule } from '@angular/forms';
//import { NgChartsModule } from 'ng2-charts'; // Ensure this is importe

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StocksComponent,
    HoldingsComponent,
    StockComponent,
    LineChartComponent,
    BarChartComponent,
    AddComponent,
    
   
  ],
  imports: [
    BrowserModule, HttpClientModule, BaseChartDirective, FormsModule,
    RouterModule.forRoot([      
      { path: 'stocks', component: StocksComponent },
      { path: 'stocks/stock/:id', component: StockComponent },
      { path: 'stocks/stock/add/:id', component: AddComponent },
    ]), AppRoutingModule
  ],
  providers: [HelperService, provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
