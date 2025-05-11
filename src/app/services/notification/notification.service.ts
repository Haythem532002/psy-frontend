import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any;
  private hasNewNotificationSubject = new BehaviorSubject<boolean>(false);
  hasNewNotification$ = this.hasNewNotificationSubject.asObservable();

  constructor(private http: HttpClient) {}

  connect() {
    const socket = new SockJS('http://localhost:7090/psy-websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/psy', (message: any) => {
        const notification = JSON.parse(message.body);
        this.hasNewNotificationSubject.next(true);
      });
    });
  }

  markNotificationsAsRead() {
    this.hasNewNotificationSubject.next(false);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('http://localhost:7090/notifications');
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
