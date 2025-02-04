import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeedbackComponent } from '../../components/feedback/feedback.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    FeedbackComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  contactForm = new FormGroup({
    email: new FormControl(''),
    message: new FormControl(''),
  });

  submit() {
    alert(
      `Email: ${this.contactForm.get('email')?.value},
      Message: ${this.contactForm.get('message')?.value}`
    );
  }
}
