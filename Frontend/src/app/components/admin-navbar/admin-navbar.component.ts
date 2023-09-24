import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/sessions.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { SignoutService } from 'src/app/services/signout.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  sub!: Subscription;

  currentUserLogged: boolean = false;
  currentUser!: string;

  constructor(private session: SessionService, private router: Router, private adminService: AdminService, private signoutService: SignoutService) { }

  ngOnInit(): void {
    const admin = this.session.getSessionValue('currentAdmin');
    if (admin != null) {
      this.currentUserLogged = true;
    }
  }

  logout(): void {
    this.session.removeSessionValue('currentAdmin');
    this.signoutService.signOut("admin");
    this.currentUserLogged = false;
    window.location.reload();
  }

  login(): void {
    this.sub = this.adminService
      .logout().subscribe({
        next: admin => {
          console.log("logged out");
        },
        error: (err: string) => {
          alert('something went wrong while logging out');
        }
      })
    this.router.navigate(['/signin']);
  }


}
