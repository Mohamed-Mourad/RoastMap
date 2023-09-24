import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerService {

  private sellerBaseUrl = 'http://localhost:18077/sellersVertical-1.0-SNAPSHOT/svApi/seller';

  constructor(private http: HttpClient) { }

  getSellersUsername(): Observable<any> {
    return this.http.get(this.sellerBaseUrl + "/getUsername", {responseType: 'text'});
  }

  getAllSold(): Observable<any> {
    return this.http.get(this.sellerBaseUrl + "/getAllSold", { withCredentials: true });
  }

  viewOnSale(): Observable<any> {
    return this.http.get(this.sellerBaseUrl + "/viewOnSale", { withCredentials: true });
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(this.sellerBaseUrl + "/addProduct", productData, { withCredentials: true });
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