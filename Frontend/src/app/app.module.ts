import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/sign/signup/signup.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './components/sign/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { CourierComponent } from './components/courier/courier.component';
import { ShopComponent } from './components/shop/shop.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerComponent } from './components/seller/seller.component';
import { SessionService } from './services/sessions.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { SellerNavbarComponent } from './components/seller-navbar/seller-navbar.component';
import { CourierNavbarComponent } from './components/courier-navbar/courier-navbar.component';
import { AuthInterceptor } from './auth.interceptor';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    CourierComponent,
    ShopComponent,
    CustomerNavbarComponent,
    SellerComponent,
    NavbarComponent,
    AdminComponent,
    AdminNavbarComponent,
    SellerNavbarComponent,
    CourierNavbarComponent,
    CustomerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    Title,
    SessionService,
    { provide: 'WINDOW', useValue: window },
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true ,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
