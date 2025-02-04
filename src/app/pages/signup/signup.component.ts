import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    alert(`
      firstname : ${this.signUpForm.get("firstname")?.value}
      lastname : ${this.signUpForm.get("lastname")?.value}
      Email : ${this.signUpForm.get("email")?.value}
      password : ${this.signUpForm.get("password")?.value}
    `);
  }
}
