import { Doctor } from './Doctor';
import { User } from './User';

export interface AppointmentBook {
  user?: User;
  appointmentType: string;
  appointmentDateTime: Date;
  doctor: Doctor;
}
