import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DoctorHomeComponent } from './pages/doctor/doctor-home/doctor-home.component';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { DoctorDetailsComponent } from './pages/doctor/doctor-details/doctor-details.component';
import { PaymentFailComponent } from './pages/payment-fail/payment-fail.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';
import { DoctorListComponent } from './pages/doctor/doctor-list/doctor-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Landing page
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
    children: [
      { path: '', redirectTo: 'doctor-list', pathMatch: 'full' },
      { path: 'doctor-list', component: DoctorListComponent },
      {
        path: 'doctor-details/:id',
        component: DoctorDetailsComponent,
      },
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'payment-history', component: PaymentHistoryComponent },
    ],
  },
  {
    path: 'payment/fail',
    component: PaymentFailComponent,
  },
];
