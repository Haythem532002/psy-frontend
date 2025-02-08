import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DoctorHomeComponent } from './pages/doctor/doctor-home/doctor-home.component';
import { ProtectedRouteComponent } from './pages/protected-route/protected-route.component';
import { AuthGuard } from './services/auth/authGuard';
import { GuestGuard } from './services/auth/guestGuard';

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
    path: 'doctorHome',
    component: DoctorHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'protected',
    component: ProtectedRouteComponent,
    canActivate: [AuthGuard],
  },
];
