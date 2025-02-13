import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RegistrationRequest } from '../../models/Registration';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signUpForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    const formData: RegistrationRequest = {
      firstName: this.signUpForm.get('firstname')?.value || '',
      lastName: this.signUpForm.get('lastname')?.value || '',
      email: this.signUpForm.get('email')?.value || '',
      password: this.signUpForm.get('password')?.value || '',
    };

    this.authService.register(formData);
  }
}
