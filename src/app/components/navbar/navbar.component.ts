import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuVisible: boolean = false;
  notificationListVisible: boolean = false;
  notifications: { title: string; description: string; date: string }[] = [
    {
      title: 'New Appointment',
      description: 'You have a new appointment scheduled with Dr. Smith.',
      date: '2025-05-08',
    },
    {
      title: 'Payment Received',
      description: 'Your payment of $200 has been successfully processed.',
      date: '2025-05-07',
    },
    {
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
      date: '2025-05-06',
    },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  toggleNotificationList() {
    this.notificationListVisible = !this.notificationListVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-details')) {
      this.menuVisible = false;
    }
    if (!target.closest('.notification')) {
      this.notificationListVisible = false;
    }
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/home/edit-profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}
