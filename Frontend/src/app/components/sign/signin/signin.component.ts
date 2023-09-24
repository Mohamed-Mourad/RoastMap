import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/sessions.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sub!: Subscription;

  bgUrl = 'assets/images/bg8.jpg';

  selectedUserType!: string;
  email!: string;
  password!: string;

  constructor(private title: Title, private signinService: SigninService, private session: SessionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.title.setTitle("Sign In")
  }

  signIn(): void {
    const userData = {
      email: this.email,
      password: this.password
    }

    this.sub = this.signinService
      .signIn(this.selectedUserType, userData).subscribe({
        next: response => {
          
          if (this.selectedUserType == "customer") {
            this.session.setSessionValue('currentCustomer', userData.email);
            location.href = 'home';
          } else if (this.selectedUserType == "admin") {
            this.session.setSessionValue('currentAdmin', userData.email);
            location.href = 'admin';
          } else if (this.selectedUserType == "courier") {
            this.session.setSessionValue('currentCourier', userData.email);
            location.href = 'courier';
          } else if (this.selectedUserType == "seller") {
            this.session.setSessionValue('currentSeller', userData.email);
            location.href = 'seller';
          }
        },
        error: (err: string) => {
          alert('something went wrong in signin');
          this.errorMessage = err
        }
      });
  }

  errorMessage: string = '';

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

}
