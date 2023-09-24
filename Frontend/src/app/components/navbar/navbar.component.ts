import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUserLogged: boolean = false;
  currentUser!: string;

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit(): void {
    const customer = this.session.getSessionValue('currentCustomer');
    const admin = this.session.getSessionValue('currentAdmin');
    const seller = this.session.getSessionValue('currentSeller');
    const courier = this.session.getSessionValue('currentCourier');
    if (customer != null) {
      this.currentUserLogged = true;
      this.currentUser = customer;
    } else if (admin != null) {
      this.currentUserLogged = true;
      this.currentUser = admin;
    } else if (seller != null) {
      this.currentUserLogged = true;
      this.currentUser = seller;
    } else if (courier != null) {
      this.currentUserLogged = true;
      this.currentUser = courier;
    }
  }

  logout(): void {
    this.session.removeSessionValue(this.currentUser);
    this.currentUserLogged = false;
    window.location.reload();
  }

  login(): void {
    this.router.navigate(['/signin']);
  }

}
