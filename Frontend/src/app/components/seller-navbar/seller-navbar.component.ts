import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { Router } from '@angular/router';
import { SignoutService } from 'src/app/services/signout.service';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.css']
})
export class SellerNavbarComponent implements OnInit {

  currentUserLogged: boolean = false;
  currentUser!: string;

  constructor(private session: SessionService, private router: Router, private signoutService: SignoutService) { }

  ngOnInit(): void {
    const admin = this.session.getSessionValue('currentSeller');
    if (admin != null) {
      this.currentUserLogged = true;
    }
  }

  logout(): void {
    this.session.removeSessionValue('currentSeller');
    this.signoutService.signOut("seller");
    this.currentUserLogged = false;
    window.location.reload();
  }

  login(): void {
    this.router.navigate(['/signin']);
  }

}
