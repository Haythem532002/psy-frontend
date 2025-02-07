import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DoctorHomeComponent } from './pages/doctor/doctor-home/doctor-home.component';
import { ProtectedRouteComponent } from './pages/protected-route/protected-route.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'doctorHome',
    component: DoctorHomeComponent,
  },
  {
    path: 'protected',
    component: ProtectedRouteComponent,
  },
];
