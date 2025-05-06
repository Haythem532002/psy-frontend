import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  user = {
    email: 'support@profilepress.net',
    firstName: 'John',
    lastName: 'Doe',
    birthday: '1990-01-01',
    location: 'New York',
    image: '',
  };

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log('User data saved:', this.user);
    // Add logic to save user data
  }

  logout(): void {
    console.log('Logging out');
  }
}
