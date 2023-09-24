import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, switchMap } from 'rxjs';
import { SellerService } from 'src/app/services/seller.service';
import { SessionService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  sub!: Subscription;
  errorMessage: string = '';

  description!: string;
  fileName!: string;
  name!: string;
  price!: string;
  quantity!: string;
  sellerName!: string;

  currentTab = 0;

  sellerProducts!: any;
  sellerSoldItems!: any;

  constructor(private title: Title, private sellerService: SellerService, private session: SessionService) { }

  ngOnInit(): void {
    this.title.setTitle("seller");

    const seller = this.session.getSessionValue('currentSeller');

    if (seller != null) {

      this.sub = this.sellerService
      .getSellersUsername().subscribe({
        next: seller => {
          this.sellerName = seller;
        },
        error: (err: string) => {
          alert('something went wrong in getSellersUsername');
          this.errorMessage = err
        }
      });

      this.sub = this.sellerService
      .viewOnSale().subscribe({
        next: products => {
          this.sellerProducts = products;
          console.log(products);;
        },
        error: (err: string) => {
          alert('something went wrong in viewOnSale');
          this.errorMessage = err
        }
      });

      this.sub = this.sellerService
      .getAllSold().subscribe({
        next: products => {
          this.sellerSoldItems = products;
          console.log(products);;
        },
        error: (err: string) => {
          alert('something went wrong in getAllSold');
          this.errorMessage = err
        }
      });

    }
  }



  addProduct(): void {
    if (this.sellerName == null) {
      alert("you need to login first")
    } else {
      const product = {
        name: this.name,
        price: this.price,
        description: this.description,
        sellerName: this.sellerName,
        fileName: this.fileName,
        quantity: this.quantity
      }
      console.log(product);
      this.sub = this.sellerService
        .addProduct(product).subscribe({
          next: product => {
            console.log(product);
            window.location.reload();
          },
          error: (err: string) => {
            alert('something went wrong in add product');
            this.errorMessage = err;
          }
        });
    }
  }

}
