import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService<T> {
  public baseURL = "";
  public resultData: T[] = [];
  public waitingData: any;
  constructor(private _httpService: HttpClient) {
    this.baseURL = "https://localhost:7117/api/";
  }
  getAll(serviceName: string): Observable<T[]> {
    //.pipe(map((apiCountry: Country[]) => apiCountry[0]));
    return this._httpService.get<T[]>(this.baseURL + serviceName).pipe(map((apiData: T[]) => apiData));
    //this._httpService.get<T[]>(this.baseURL + serviceName).subscribe(result => {
    //console.log(result);
    //this.resultData =  result;
    //}, error => console.log(error));    
    //return this.resultData;
  }
}
