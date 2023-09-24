import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourierService {

  private courierBaseUrl = 'http://localhost:8080/couriersVertical-1.0-SNAPSHOT/crvApi/courier';

  constructor(private http: HttpClient) { }

  getOrdersByStatus(status: string): Observable<any> {
    return this.http.get(this.courierBaseUrl + "/getOrdersByStatus/" + status, { withCredentials: true })
  }

  updateStatusInprogress(orderId: string): Observable<any> {
    return this.http.put(this.courierBaseUrl + "/updateStatus/" + orderId + "/inProgress", { withCredentials: true })
  }

  updateStatusShipped(orderId: string): Observable<any> {
    return this.http.put(this.courierBaseUrl + "/updateStatus/" + orderId + "/shipped", { withCredentials: true })
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