import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { Router } from '@angular/router';
import { SignoutService } from 'src/app/services/signout.service';

@Component({
  selector: 'app-courier-navbar',
  templateUrl: './courier-navbar.component.html',
  styleUrls: ['./courier-navbar.component.css']
})
export class CourierNavbarComponent implements OnInit {

  currentUserLogged: boolean = false;
  currentUser!: string;

  constructor(private session: SessionService, private router: Router, private signoutService: SignoutService) { }

  ngOnInit(): void {
    const admin = this.session.getSessionValue('currentCourier');
    if (admin != null) {
      this.currentUserLogged = true;
    }
  }

  logout(): void {
    this.session.removeSessionValue('currentCourier');
    this.signoutService.signOut("courier");
    this.currentUserLogged = false;
    window.location.reload();
  }

  login(): void {
    this.router.navigate(['/signin']);
  }

}
