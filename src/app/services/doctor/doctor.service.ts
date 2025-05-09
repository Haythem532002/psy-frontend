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

  getDoctosCount() {
    return this.http.get(this.apiUrl + '/count');
  }

  searchDoctorPage(
    page: number,
    size: number,
    name: any,
    price: number,
    gender: string
  ) {
    if (name === '') {
      return this.http.get(
        this.apiUrl +
          `/search?page=${page}&size=${size}&name=&price=${price}&gender=${gender}`
      );
    } else {
      return this.http.get(
        this.apiUrl +
          `/search?page=${page}&size=${size}&name=${name}&price=${price}&gender=${gender}`
      );
    }
  }
}
