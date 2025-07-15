import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient!: Client;
  private hasNewNotificationSubject = new BehaviorSubject<boolean>(false);
  hasNewNotification$ = this.hasNewNotificationSubject.asObservable();

  constructor(private http: HttpClient) {}

  connect() {
    this.stompClient = new Client({
      brokerURL: '', // fallback to SockJS
      webSocketFactory: () => new SockJS('http://localhost:7090/psy-websocket'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/psy', (message: Message) => {
        const notification = JSON.parse(message.body);
        this.hasNewNotificationSubject.next(true);
      });
    };

    this.stompClient.activate();
  }

  markNotificationsAsRead() {
    this.hasNewNotificationSubject.next(false);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('http://localhost:7090/notifications');
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
