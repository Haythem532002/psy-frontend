import { Doctor } from './Doctor';

export interface Appointment {
  id?: number;
  doctor: Doctor;
  appointmentType: string;
  date: Date;
}
