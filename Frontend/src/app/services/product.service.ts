import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private productBaseUrl = 'http://localhost:18077/sellersVertical-1.0-SNAPSHOT/svApi/product';
    
    constructor(private http: HttpClient) { }

    getSellersProducts(seller: string): Observable<any> {
        return this.http.get(this.productBaseUrl+"/getBySeller/"+seller); 
    }

    getAllProducts(): Observable<any> {
        return this.http.get(this.productBaseUrl+"/getAllProducts");
    }

    getSeller(productData: any): Observable<any> {
        return this.http.get(this.productBaseUrl+"/"+productData.pId+"/getseller"); 
    }

    addProduct(productData: any): Observable<any> {
        return this.http.post(this.productBaseUrl+"/addNewProduct", productData); 
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