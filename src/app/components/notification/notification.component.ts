import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../services/notification/notification.service';
import { SplitDateTime } from '../../utils/dateUtils';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}
  notificationListVisible: boolean = false;

  notifications: Notification[] = [];
  ngOnInit() {
    this.getAllNotifications();
  }

  toggleNotificationList() {
    this.notificationListVisible = !this.notificationListVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification')) {
      this.notificationListVisible = false;
    }
  }

  getAllNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (response: any) => {
        this.notifications = response;
        console.log(this.notifications);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });
  }
}
