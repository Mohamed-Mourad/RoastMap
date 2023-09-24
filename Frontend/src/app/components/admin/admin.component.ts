import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { SessionService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sub!: Subscription;
  errorMessage: string = '';

  adminEmail!: string;

  currentTab = 0;
  currentSubTabOne = 0;
  currentSubTabTwo = 0;

  courierRequests!: any;
  sellerRequests!: any;

  customers!: any;
  sellers!: any;
  couriers!: any;

  sellerUsername: any;

  courierUsername: any;
  courierZones: string = "";
  isZayed!: boolean;
  isDokki!: boolean;
  isTagamo!: boolean;
  isHaram!: boolean;

  constructor(private title: Title, private adminService: AdminService, private session: SessionService) { }

  ngOnInit(): void {
    this.title.setTitle("admin");

    const admin = this.session.getSessionValue('currentAdmin');

    if (admin != null) {
      this.adminEmail = admin;
    }

    this.sub = this.adminService
      .getAllCustomers().subscribe({
        next: customers => {
          this.customers = customers;
          console.log(this.customers);

        },
        error: (err: string) => {
          alert('something went wrong in getAllCustomers');
          this.errorMessage = err
        }
      });

    this.sub = this.adminService
      .getAllSellers().subscribe({
        next: sellers => {
          this.sellers = sellers;
          console.log(this.sellers);

        },
        error: (err: string) => {
          alert('something went wrong in getAllSellers');
          this.errorMessage = err
        }
      });

    this.sub = this.adminService
      .getAllCouriers().subscribe({
        next: couriers => {
          this.couriers = couriers;
          console.log(this.couriers);

        },
        error: (err: string) => {
          alert('something went wrong in getAllCouriers');
          this.errorMessage = err
        }
      });
  }

  generateSeller(): void {
    this.sub = this.adminService
      .generateSellerAccount(this.sellerUsername).subscribe({
        next: seller => {
          console.log("seller created: " + seller);
        },
        error: (err: string) => {
          alert('something went wrong in generateSeller');
          this.errorMessage = err
        }
      });
  }

  generateCourier(): void {
    const zonesBools = {
      zayed: this.isZayed,
      dokki: this.isDokki,
      tagamo: this.isTagamo,
      haram: this.isHaram
    }

    for (const zone in zonesBools) {
      if (zonesBools[zone as keyof typeof zonesBools]) {
        this.courierZones = this.courierZones + "1";
      } else {
        this.courierZones = this.courierZones + "0";
      }
    }

    this.sub = this.adminService
      .generateCourierAccount(this.courierUsername, this.courierZones).subscribe({
        next: courier => {
          console.log(this.courierZones)
          console.log("courier created: " + courier);
        },
        error: (err: any) => {
          console.log(err);
          alert('something went wrong in generateCourier');
          this.errorMessage = err
        }
      });
    this.courierZones = "";
  }
}
