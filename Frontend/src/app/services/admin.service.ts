import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private adminBaseUrl = 'http://localhost:16957/adminsVertical-1.0-SNAPSHOT/avApi/admin';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any> {
    return this.http.get(this.adminBaseUrl + "/getAllUsers/customers", { withCredentials: true });
  }

  getAllSellers(): Observable<any> {
    return this.http.get(this.adminBaseUrl + "/getAllUsers/sellers", { withCredentials: true });
  }

  getAllCouriers(): Observable<any> {
    return this.http.get(this.adminBaseUrl + "/getAllUsers/couriers", { withCredentials: true });
  }

  generateSellerAccount(seller: string): Observable<any> {
    return this.http.post(this.adminBaseUrl + "/generateSellerAccount/" + seller, { withCredentials: true }, { responseType: 'text' });
  }

  generateCourierAccount(courier: string, zones: string): Observable<any> {
    return this.http.post(this.adminBaseUrl + "/generateCourierAccount/" + courier + "/" + zones, { withCredentials: true }, { responseType: 'text' });
  }

  logout(): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const headers = {
        Authorization: `Bearer ${authToken}`
      };
      return this.http.put(this.adminBaseUrl + "/logout", null, { headers }).pipe(
        tap(() => {
          localStorage.removeItem('authToken');
        })
      );
    } else {
      return this.http.put(this.adminBaseUrl + "/logout", null)
    }
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