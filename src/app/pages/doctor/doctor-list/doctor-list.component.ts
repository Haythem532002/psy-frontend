import { Component, ViewEncapsulation } from '@angular/core';
import { Doctor } from '../../../models/Doctor';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { UserService } from '../../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    MatIconModule,
    DoctorCardComponent,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
})
export class DoctorListComponent {
  constructor(
    private doctorService: DoctorService,
    private userService: UserService
  ) {}
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
    const email = window.history.state.email;
    console.log('Here ', email);
    this.userService.saveUserId(email);
  }
}
