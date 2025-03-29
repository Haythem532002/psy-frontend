import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:7090/doctor';
  getDoctorByPage(page: number, size: number) {
    return this.http.get(this.apiUrl + `/all?page=${page}&size=${size}`);
  }

  getDoctorById(id: number) {
    return this.http.get(this.apiUrl + `/${id}`);
  }
  
}
