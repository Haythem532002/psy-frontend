import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any;

  connect() {
    const socket = new SockJS('http://localhost:7090/psy-websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/psy', (message:any) => {
        const notification = JSON.parse(message.body);
        alert(notification.message);
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
