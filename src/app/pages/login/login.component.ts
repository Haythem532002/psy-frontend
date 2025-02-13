import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginRequest } from '../../models/Login';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  token: string = '';
  constructor(private authService: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    const formData: LoginRequest = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };

    this.authService.login(formData);
  }
}
