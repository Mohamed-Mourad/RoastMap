import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  currentTab = 0;

  sub!: Subscription;

  inQueue!: any;

  inProgress!: any;

  Delivered!: any;
  
  constructor(private title: Title, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.title.setTitle("Profile");

    this.sub = this.customerService
      .getOrdersByStatus("inQueue").subscribe({
        next: orders => {
          this.inQueue = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });

      this.sub = this.customerService
      .getOrdersByStatus("inProgress").subscribe({
        next: orders => {
          this.inProgress = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });

      this.sub = this.customerService
      .getOrdersByStatus("shipped").subscribe({
        next: orders => {
          this.Delivered = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });

  }

}
