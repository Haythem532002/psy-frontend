import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DoctorHomeComponent } from './pages/doctor/doctor-home/doctor-home.component';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { DoctorDetailsComponent } from './pages/doctor/doctor-details/doctor-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailComponent } from './pages/payment-fail/payment-fail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'home',
    component: DoctorHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'doctor-details/:id',
    component: DoctorDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'payment/fail',
    component: PaymentFailComponent,
  },
];
