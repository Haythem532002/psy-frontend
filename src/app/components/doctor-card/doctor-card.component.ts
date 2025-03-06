import { Component, input } from '@angular/core';
import { Doctor } from '../../models/Doctor';


@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css',
})
export class DoctorCardComponent {
  doctor = input<Doctor>();
}
