import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { UserService } from '../../services/user/user.service';
import { Appointment } from '../../models/Appointment';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AppointmentCardComponent],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  appointments$: Appointment[] = [];
  error: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAvailableAppointments().subscribe({
      next: (response: Appointment[]) => {
        this.appointments$ = response;
      },
    });
  }
}
