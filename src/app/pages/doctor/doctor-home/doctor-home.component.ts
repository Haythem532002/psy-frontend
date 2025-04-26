import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../models/Doctor';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { UserService } from '../../../services/user/user.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css',
})
export class DoctorHomeComponent {
  
}
