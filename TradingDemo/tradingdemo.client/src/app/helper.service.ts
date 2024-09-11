import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public apiUrl = "";
 /* public resultData: T[] = [];*/
  public waitingData: any;
  constructor(private http: HttpClient) {
    this.apiUrl = "https://localhost:7117/api/";
  }
  //getAll(serviceName: string): Observable<T[]> {   
  //  return this.http.get<T[]>(this.apiUrl + serviceName).pipe(map((apiData: T[]) => apiData));
  //}
  //getById(serviceName: string,paramId: string): Observable<T> {
  //  return this.http.get<T>(this.baseURL + serviceName +"/"+${Id}).pipe(map((apiData: T[]) => apiData[0]));
  //}
  //Common Function
  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "2024/09/09";
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}/${month}/${day}`;
  }

  // Read (Get) - Fetch all items
  getItems(serviceName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + serviceName).pipe(
      catchError(this.handleError<any[]>('getItems', []))
    );
  }

  // Read (Get) - Fetch a single item by ID
  getItem(serviceName: string, id: string): Observable<any> {
    // Create HttpParams object to hold query parameters
    let params = new HttpParams().set('stockid', id);

    const url = `${this.apiUrl+serviceName}/${id}`;
    return this.http.get<any>(url, { params }).pipe(
      catchError(this.handleError<any>(`getItem id=${id}`))
    );
  }

  // Create - Add a new item
  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('addItem'))
    );
  }

  // Update - Edit an existing item
  updateItem(id: number, item: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateItem'))
    );
  }

  // Delete - Remove an item by ID
  deleteItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteItem'))
    );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); // Use `of` to return an observable of the result
    };
  }

  // HTTP Options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
