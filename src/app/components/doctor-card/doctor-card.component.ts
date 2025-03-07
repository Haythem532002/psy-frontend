import { Component, input } from '@angular/core';
import { Doctor } from '../../models/Doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css',
})
export class DoctorCardComponent {
  constructor (private router: Router) {}
  doctor = input<Doctor>();
  viewDoctor() {
    this.router.navigate(['/doctor-details', this.doctor()?.id]);
  }
}
