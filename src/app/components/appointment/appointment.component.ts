import { Component, EventEmitter, input, Output } from '@angular/core';
import { TimeSlots } from '../../constants/AppointmentConstants';
import { getFirstAndLastDayOfWeek } from '../../utils/dateUtils';
import { AppointmentBookService } from '../../services/shared/appointment-book.service';
import { AppointmentBook } from '../../models/AppointmentBook';
import { Doctor } from '../../models/Doctor';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  @Output() closeModal = new EventEmitter<void>();
  doctor = input<Doctor>();

  AppointmentType: string = 'Online';

  selectedSessionIndex: number | null = null;

  //this should be fetched from the backend
  bookedSessions: boolean[][] = [
    [false, true, false, false, false, false],
    [false, false, false, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ];

  constructor(private appointmentBookService: AppointmentBookService) {}

  isSessionBooked(day: number, time: number): boolean {
    return this.bookedSessions[day][time];
  }

  isSessionChecked(day: number, time: number): boolean {
    return this.selectedSessionIndex === day * TimeSlots.length + time;
  }

  onCheckboxChange(day: number, time: number) {
    this.selectedSessionIndex = day * TimeSlots.length + time;
  }

  bookAppointment() {
    if (this.selectedSessionIndex !== null) {
      const day = Math.floor(this.selectedSessionIndex / TimeSlots.length);
      const time = this.selectedSessionIndex % TimeSlots.length;
      const timeString = TimeSlots[time];
      const [hours, minutes] = timeString.split('-')[0].split('h');
      const [firstDayOfWeek, lastDayOfWeek] = getFirstAndLastDayOfWeek();
      const actualDate = new Date();
      const selectedDate = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + day + 1,
        Number(hours),
        Number(minutes)
      );
      if (selectedDate < actualDate) {
        alert('Please select a future date.');
      }
      const appointmentData: AppointmentBook = {
        appointmentDateTime: selectedDate,
        appointmentType: this.AppointmentType,
        doctor: this.doctor()!,
      };
    } else {
      alert('Please select a session to book.');
    }
  }
  onCloseModal() {
    this.closeModal.emit();
  }
}
