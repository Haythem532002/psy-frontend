import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegistrationRequest } from '../../services/auth/Registration';
import { AuthService } from '../../services/auth/authService';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
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

    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Handle success (optional)
      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle error (optional)
      }
    );
  }
}
