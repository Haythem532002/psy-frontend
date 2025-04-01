import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../models/Doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css',
})
export class DoctorDetailsComponent {
  doctor!: Doctor;

  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    this.doctorService
      .getDoctorById(Number(doctorId))
      .subscribe((doctor: any) => {
        this.doctor = doctor;
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
