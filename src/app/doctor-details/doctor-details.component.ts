import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css',
})
export class DoctorDetailsComponent {
  doctor: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    // Fetch the doctor details using the doctorId
    // This is just a placeholder. Replace it with your actual data fetching logic.
    this.doctor = {
      id: doctorId,
      firstName: 'John',
      lastName: 'Doe',
      education: 'MD, PhD',
      description: 'Experienced cardiologist',
      price: 100,
    };
  }
}
