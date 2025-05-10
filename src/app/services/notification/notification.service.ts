import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any;

  connect() {
    this.stompClient = new Client({
      brokerURL: '', // fallback to SockJS
      webSocketFactory: () => new SockJS('http://localhost:8080/psy-websocket'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/psy', (message: Message) => {
        const notification = JSON.parse(message.body);
        alert(notification.message);
      });
    };

    this.stompClient.activate();
  }
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
