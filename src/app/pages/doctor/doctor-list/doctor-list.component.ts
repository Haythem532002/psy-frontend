import { Component, ViewEncapsulation } from '@angular/core';
import { Doctor } from '../../../models/Doctor';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { UserService } from '../../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    MatIconModule,
    DoctorCardComponent,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
})
export class DoctorListComponent {
  constructor(
    private doctorService: DoctorService,
    private userService: UserService
  ) {}
  page = 0;
  size = 8;
  totalLength = 0;
  priceValue: number = 200;

  searchName: string | null = '';

  selectedGender: string = 'All';
  doctors: Doctor[] = [];

  onSearch() {
    if (
      this.searchName === '' &&
      this.priceValue === 50 &&
      this.selectedGender === 'All'
    ) {
      return;
    }
    this.doctorService
      .searchDoctorPage(
        this.page,
        this.size,
        this.searchName,
        this.priceValue,
        this.selectedGender
      )
      .subscribe({
        next: (data: any) => {
          this.doctors = data.content;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

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

  getDoctorCount() {
    this.doctorService.getDoctosCount().subscribe({
      next: (data: any) => {
        this.totalLength = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    if (
      this.priceValue != 200 ||
      this.searchName != '' ||
      this.selectedGender != 'All'
    ) {
      this.onSearch();
    } else {
      this.search();
    }
  }

  ngOnInit() {
    this.getDoctorCount();
    this.search();
    const email = window.history.state.email;
    this.userService.saveUserId(email);
  }
}
