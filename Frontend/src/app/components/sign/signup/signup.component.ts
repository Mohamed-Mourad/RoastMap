import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  sub!: Subscription;

  bgUrl = 'assets/images/bg8.jpg';

  selectedUserType!: string;

  username!: string;
  email!: string;
  password!: string;
  address!: string;
  customerZone!: string;
  courierZones!: string;

  isZayed!: boolean;
  isDokki!: boolean;
  isTagamo!: boolean;
  isHaram!: boolean;

  constructor(private title: Title, private signupService: SignupService) { }

  ngOnInit(): void {
    this.title.setTitle("Sign Up");
    this.courierZones = "";
  }

  signUp(): void {

    const zonesBools = {
      Sheikh_Zayed: this.isZayed,
      Dokki: this.isDokki,
      Fifth_Settlement: this.isTagamo,
      Haram: this.isHaram
    }

    for (const zone in zonesBools) {
      if (zonesBools[zone as keyof typeof zonesBools]) {
        this.courierZones = this.courierZones + "1";
      } else {
        this.courierZones = this.courierZones + "0";
      }
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      address: this.address,
      zone: this.customerZone,
      courierZones: this.courierZones
    }

    this.sub = this.signupService
      .signUp(this.selectedUserType, userData).subscribe({
        next: user => {
          if (typeof user === 'string') {
            const userArray = user.split(":");
            const email = userArray[0];
            const password = userArray[1];
            const message = "your email: " + email + "\nyour password: " + password;
            alert(message);
          }
          location.href = 'signin';
        },
        error: (err: string) => {
          alert('something went wrong');
          console.log(err);
          this.errorMessage = err
        }
      });
  }

  errorMessage: string = '';

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
