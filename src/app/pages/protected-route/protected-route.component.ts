import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-protected-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected-route.component.html',
  styleUrl: './protected-route.component.css',
})
export class ProtectedRouteComponent {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  result: string[] = [];

  searchDoctors() {
    this.httpClient.get('http://localhost:7090/doctor').subscribe({
      next: (response: any) => {
        this.result = response;
      },
      error: (error) => console.log("Can't send request", error),
    });
  }
}
