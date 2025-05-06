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

  constructor(private router: Router,private authService:AuthService) {}

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  // Hides the menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-details')) {
      this.menuVisible = false;
    }
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/home/edit-profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}
