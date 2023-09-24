import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, switchMap } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  sub!: Subscription;
  errorMessage: string = '';

  userName!: string;

  isCartOpen: boolean = false;
  @ViewChild('cart', { static: false }) cart!: ElementRef;

  isNotfsOpen: boolean = false;
  @ViewChild('notifications', { static: false }) notifications!: ElementRef;

  products!: any;

  productsCart: any = [];

  notificationsList: any = [];

  customerUsername!: string;
  customerEmail!: string;

  productsTest = [
    { pId: 2, name: 'product', price: 62.99, description: 'blablabla', sellerName: 'seller', fileName: 'assets/images/2.png' },
    { pId: 3, name: 'product', price: 62.99, description: 'blablabla', sellerName: 'seller', fileName: 'assets/images/3.png' },
    { pId: 4, name: 'product', price: 62.99, description: 'blablabla', sellerName: 'seller', fileName: 'assets/images/4.png' },
  ]

  @ViewChild('popular') popularElement!: ElementRef;
  @ViewChild('drinks') drinksElement!: ElementRef;
  @ViewChild('food') foodElement!: ElementRef;
  @ViewChild('bottles') bottlesElement!: ElementRef;
  @ViewChild('retail') retailElement!: ElementRef;

  scrollToElement(element: ElementRef): void {
    element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', offset: 177 });
  }

  constructor(private title: Title, private customerService: CustomerService, private session: SessionService) { }

  ngOnInit(): void {
    this.title.setTitle("Shop");

    const customer = this.session.getSessionValue('currentCustomer');
    console.log(customer);

    if (customer != null) {
      this.customerEmail = customer;
      this.sub = this.customerService
        .getCustomersUsername().subscribe({
          next: username => {
            console.log(username);
            this.customerUsername = username;

            this.sub = this.customerService
              .getNotifications(this.customerUsername).subscribe({
                next: notifications => {
                  this.notificationsList = notifications;
                },
                error: (err: string) => {
                  alert('something went wrong in getNotifications');
                  this.errorMessage = err
                }
              });
          },
          error: (err: string) => {
            alert('something went wrong in getCustomersUsername');
            this.errorMessage = err
          }
        });
    }


    this.sub = this.customerService
      .getAllProducts().subscribe({
        next: products => {
          this.products = products;
        },
        error: (err: string) => {
          alert('something went wrong in getAllProducts');
          this.errorMessage = err
        }
      });

  }

  ngAfterViewInit() {
    // You can use this method to scroll to a specific element on page load.
    // For example, to scroll to the popularElement, you would call
    // this.scrollToElement(this.popularElement.nativeElement);
  }

  addProductToCart(product: any): void {
    const productData = {
      productId: product.pId,
      sellerName: product.sellerName
    }
    this.productsCart.push(productData);
  }

  removeProductFromCart(product: any): void {
    const index = this.productsCart.indexOf(product);
    if (index !== -1) {
      this.productsCart.splice(index, 1);
    }
  }

  order(): void {
    this.sub = this.customerService
      .placeOrder(this.productsCart).subscribe({
        next: order => {
          console.log(order);
          alert("order made successfuly");
        },
        error: (err: string) => {
          alert('something went wrong in order');
          this.errorMessage = err
        }
      });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen) {
      this.cart.nativeElement.classList.add('open');
      // document.addEventListener('click', this.onDocumentClick);
    } else {
      this.cart.nativeElement.classList.remove('open');
      // document.removeEventListener('click', this.onDocumentClick);
    }
  }

  toggleNotfs() {
    this.isNotfsOpen = !this.isNotfsOpen;
    console.log("notfs toggled");
    console.log('notifications:', this.notifications);
    if (this.isNotfsOpen) {
      this.notifications.nativeElement.classList.add('open');
      // document.addEventListener('click', this.onDocumentClick);
    } else {
      this.notifications.nativeElement.classList.remove('open');
      // document.removeEventListener('click', this.onDocumentClick);
    }
  }

  onDocumentClick = (event: MouseEvent) => {
    if (!this.cart.nativeElement.contains(event.target)) {
      this.toggleCart();
    }
  }

  @HostListener('document:keydown.escape')
  onEscKeydown() {
    if (this.isCartOpen) {
      this.toggleCart();
    }
    if (this.isNotfsOpen) {
      this.toggleNotfs();
    }
  }

}
