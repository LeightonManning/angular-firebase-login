import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  template: `
    <form (submit)="sendMessage()">
      <input type="text" [(ngModel)]="message" name="message" placeholder="Type your message here">
      <button type="submit">Send</button>
    </form>
    <ul>
      <li *ngFor="let reply of replies">{{ reply }}</li>
    </ul>
  `
})
export class ChatComponent {
  message = ''; // assign value directly
  replies: string[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    this.http.post<any>('http://localhost:3000/api/chat', { message: this.message }, { withCredentials: true }).subscribe(
      response => {
        this.replies.push(response.reply);
        this.message = ''; // clear input field
      },
      error => {
        console.error(error);
        this.replies.push('Error: ' + error.message);
      }
    );
  }
}
