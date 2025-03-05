import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorService } from '../../../services/auth/doctor.service';
@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [MatIconModule, DoctorCardComponent, MatPaginatorModule],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css',
})
export class DoctorHomeComponent {
  constructor(private doctorService: DoctorService) {}
  page = 1;
  size = 8;

  search() {
    this.doctorService.getDoctorByPage(this.page, this.size).subscribe({
      next: (data) => {
        console.log(data);
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
}
