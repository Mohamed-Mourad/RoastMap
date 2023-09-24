import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SignoutService {

    constructor(private http: HttpClient) { }

    signOut(userType: string): Observable<any> {
        if (userType == "admin") {
            return this.http.put("http://localhost:16957/adminsVertical-1.0-SNAPSHOT/avApi/admin/logout", { withCredentials: true });
        } else if (userType == "customer") {
            return this.http.put("http://localhost:18072/customersVertical-1.0-SNAPSHOT/cvApi/customer/logout", { withCredentials: true });
        } else if (userType == "seller") {
            return this.http.put("http://localhost:18077/sellersVertical-1.0-SNAPSHOT/svApi/seller/logout", { withCredentials: true });
        } else {
            return this.http.put("http://localhost:8080/couriersVertical-1.0-SNAPSHOT/crvApi/courier/logout", { withCredentials: true });
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