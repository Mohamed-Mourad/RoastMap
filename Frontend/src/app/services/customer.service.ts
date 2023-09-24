import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private customerBaseUrl = 'http://localhost:18072/customersVertical-1.0-SNAPSHOT/cvApi/customer';

  constructor(private http: HttpClient) { }

  getCustomersUsername(): Observable<any> {
    return this.http.get(this.customerBaseUrl + "/getUsername", {responseType: 'text'});
  }

  getAllProducts(): Observable<any> {
    return this.http.get("http://localhost:18077/sellersVertical-1.0-SNAPSHOT/svApi/product/getAllProducts")
  }

  placeOrder(productsData: any): Observable<any> {
    return this.http.post(this.customerBaseUrl + "/placeOrder", productsData, { withCredentials: true })
  }

  getOrdersByStatus(status: string): Observable<any> {
    return this.http.get(this.customerBaseUrl + "/getOrdersByStatus/" + status, { withCredentials: true })
  }

  getNotifications(email: string): Observable<any> {
    return this.http.get("http://localhost:18072/customersVertical-1.0-SNAPSHOT/cvApi/notification/" + email + "/getNotifications", { withCredentials: true })
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `an error occured: ${err.error.message}`;
    } else {
      errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}