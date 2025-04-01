import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppointmentBook } from '../../models/AppointmentBook';

@Injectable({
  providedIn: 'root',
})
export class AppointmentBookService {
  private data = new BehaviorSubject<any>(null);
  currentData = this.data.asObservable();

  setData(newData: AppointmentBook) {
    this.data.next(newData);
  }
  constructor() {}
}
