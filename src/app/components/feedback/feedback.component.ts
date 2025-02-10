import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  imgUrl = input('');
  message = input('');
  user = input('');
}
