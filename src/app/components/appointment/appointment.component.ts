import { Component, EventEmitter, input, Output } from '@angular/core';
import { DaysOfWeek, TimeSlots } from '../../constants/AppointmentConstants';
import { getFirstAndLastDayOfWeek } from '../../utils/dateUtils';
import { AppointmentBookService } from '../../services/shared/appointment-book.service';
import { AppointmentBook } from '../../models/AppointmentBook';
import { Doctor } from '../../models/Doctor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { getCookie } from '../../utils/getCookie';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  @Output() closeModal = new EventEmitter<void>();
  doctor = input<Doctor>();
  showModal = input<boolean>(false);

  AppointmentType: string = 'Online';

  TimeSlots = TimeSlots;
  DaysOfWeek = DaysOfWeek;

  selectedSessionIndex: number | null = null;

  //this should be fetched from the backend
  bookedSessions: boolean[][] = [
    [false, true, false, false, false, false],
    [false, false, false, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ];

  constructor(
    private appointmentBookService: AppointmentBookService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  isSessionBooked(day: number, time: number): boolean {
    return this.bookedSessions[day][time];
  }

  isSessionChecked(day: number, time: number): boolean {
    return this.selectedSessionIndex === day * TimeSlots.length + time;
  }

  onCheckboxChange(day: number, time: number) {
    this.selectedSessionIndex = day * this.TimeSlots.length + time;
  }

  bookAppointment() {
    if (this.selectedSessionIndex !== null) {
      const day = Math.floor(this.selectedSessionIndex / TimeSlots.length);
      const time = this.selectedSessionIndex % this.TimeSlots.length;
      const timeString = this.TimeSlots[time];
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
      const userId = getCookie('userId');
      const appointmentData: AppointmentBook = {
        userId: Number(userId),
        appointmentDateTime: selectedDate,
        appointmentType: this.AppointmentType,
        doctorId: this.doctor()!.id,
        price: this.doctor()!.price,
      };
      this.paymentService.createCheckoutSession(appointmentData).subscribe({
        next: (res) => {
          window.location.href = res.payment_url;
        },
        error: (err) => {
          console.error('Error creating checkout session:', err);
        },
      });
    } else {
      alert('Please select a session to book.');
    }
  }
  onCloseModal() {
    this.closeModal.emit();
  }
}
