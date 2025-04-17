import { Doctor } from './Doctor';
import { User } from './User';

export interface AppointmentBook {
  userId?: number;
  appointmentType: string;
  appointmentDateTime: Date;
  doctorId: number;
  price:number;
}
