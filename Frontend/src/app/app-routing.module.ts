import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/sign/signup/signup.component';
import { SigninComponent } from './components/sign/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { CourierComponent } from './components/courier/courier.component';
import { ShopComponent } from './components/shop/shop.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { SellerComponent } from './components/seller/seller.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'courier', component: CourierComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'nav', component: CustomerNavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
