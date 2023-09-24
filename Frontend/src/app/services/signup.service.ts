import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SignupService {
    
    constructor(private http: HttpClient) { }

    signUp(userType: string, userData: any): Observable<any> {
        if(userType == "admin") {
            delete userData.address;
            delete userData.zone;
            delete userData.courierZones;
            return this.http.post("http://localhost:16957/adminsVertical-1.0-SNAPSHOT/avApi/admin/register", userData);
        }else if(userType == "customer") {
            delete userData.courierZones
            return this.http.post("http://localhost:18072/customersVertical-1.0-SNAPSHOT/cvApi/customer/register", userData);
        }else if(userType == "seller") {
            delete userData.address;
            delete userData.zone;
            delete userData.courierZones;
            return this.http.post("http://localhost:16957/adminsVertical-1.0-SNAPSHOT/avApi/admin/generateSellerAccount/"+userData.username, null, {responseType: 'text'});
        }else{
            return this.http.post("http://localhost:16957/adminsVertical-1.0-SNAPSHOT/avApi/admin/generateCourierAccount/"+userData.username+"/"+userData.courierZones, null, {responseType: 'text'});

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