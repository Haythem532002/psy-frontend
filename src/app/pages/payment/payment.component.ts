import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements AfterViewInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  constructor(private http: HttpClient) {}

  async ngAfterViewInit() {
    this.stripe = await loadStripe(
      'pk_test_51RDvoFGahA2Me4aU4bowQoRSy62qz8W2vlBihnDyEFjMnrjOnT4hYGtMVhxrgqNO3p3xEsQWtI4RoCHhigfeHRbX00u9qcML61'
    ); // Remplace par ta clé publique
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async pay() {
    const response = await this.http
      .post<any>('http://localhost:7090/api/payment/create-payment-intent', {
        amount: 1000, // Montant en centimes (ex: 10.00€)
        currency: 'eur',
      })
      .toPromise();

    const clientSecret = response.clientSecret;

    const { error, paymentIntent } = await this.stripe!.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: this.card!,
        },
      }
    );

    if (error) {
      alert(`Échec du paiement : ${error.message}`);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      alert('💳 Paiement réussi !');
    }
  }
}
