import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../models/Doctor';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [
    MatIconModule,
    DoctorCardComponent,
    MatPaginatorModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css',
})
export class DoctorHomeComponent {
  constructor(private doctorService: DoctorService) {}
  page = 1;
  size = 8;

  doctors: Doctor[] = [];

  search() {
    this.doctorService.getDoctorByPage(this.page, this.size).subscribe({
      next: (data: any) => {
        this.doctors = data.content;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.search();
  }

  ngOnInit() {
    this.search();
  }
}
