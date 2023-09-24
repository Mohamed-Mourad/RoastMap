import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css']
})
export class CourierComponent implements OnInit {

  currentTab = 0;

  sub!: Subscription;

  inQueue!: any;

  inProgress!: any;

  Delivered!: any;

  constructor(private title: Title, private courierService: CourierService) { }

  ngOnInit(): void {
    this.title.setTitle("Courier");

    this.sub = this.courierService
      .getOrdersByStatus("inQueue").subscribe({
        next: orders => {
          this.inQueue = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });

      this.sub = this.courierService
      .getOrdersByStatus("inProgress").subscribe({
        next: orders => {
          this.inProgress = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });

      this.sub = this.courierService
      .getOrdersByStatus("shipped").subscribe({
        next: orders => {
          this.Delivered = orders;
        },
        error: (err: string) => {
          alert('something went wrong in getOrdersByStatus');
        }
      });
      
  }

  processOrder(orderId: any, Status: string): void {
    orderId = orderId.toString();
    if(Status == "inQueue") {
      this.sub = this.courierService
      .updateStatusInprogress(orderId).subscribe({
        next: order => {
          console.log(order);
        },
        error: (err: string) => {
          alert('something went wrong in updateStatusInprogress');
        }
      });
    } else if(Status == "inProgress") {
      this.sub = this.courierService
      .updateStatusShipped(orderId).subscribe({
        next: order => {
          console.log(order);
        },
        error: (err: string) => {
          alert('something went wrong in updateStatusShipped');
        }
      });
    }
  }

}
