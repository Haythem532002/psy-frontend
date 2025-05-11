import { AsyncPipe, CommonModule } from '@angular/common';
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
  hasNewNotification: boolean = false;

  notifications!: Notification[];
  unreadNotifications: boolean = false; // Track if there are unread notifications

  ngOnInit() {
    this.getAllNotifications();
    this.notificationService.hasNewNotification$.subscribe((state) => {
      this.hasNewNotification = state; // Subscribe to global state
    });
  }

  toggleNotificationList() {
    this.notificationListVisible = !this.notificationListVisible;
    if (this.notificationListVisible) {
      this.notificationService.markNotificationsAsRead(); 
    }
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
        console.log(response);
        this.notifications = (response as Notification[]).sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.unreadNotifications = this.notifications.length > 0; // Set unread notifications flag
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });
  }
}
