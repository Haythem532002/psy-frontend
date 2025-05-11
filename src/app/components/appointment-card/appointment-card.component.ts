import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SplitDateTime } from '../../utils/dateUtils';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment: any;
  isButtonEnabled: boolean = true;
  date: string = '';
  time: string = '';

  ngOnInit(): void {
    this.extractDateTime();
  }

  extractDateTime(): void {
    if (this.appointment?.dateTime) {
      const [date, time] = SplitDateTime(this.appointment.dateTime);
      this.date = date;
      this.time = time;
    }
  }
}
