import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css'],
})
export class PatientregisterComponent implements OnInit {
  private stripe: Stripe | null;

  constructor() {}

  async ngOnInit() {
    console.log('state stripe ');
    this.stripe = await loadStripe(
      'pk_test_51LAfpgJJXXwqLUlGuHy2b3JwNZ556zqI7LILIKbjBUPFDgm6vDNh6l7yEr5wObxdEPggUZEnjkkbIn28Pycn3g4a00suOL159G'
    );

    const elements = this.stripe?.elements();
    const card = elements?.create('card');

    card?.mount('#card');

    card?.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      event.error
        ? (displayError!.textContent = event.error.message)
        : (displayError!.textContent = '');
    });

    const button = document.getElementById('button-paid');

    button?.addEventListener('click', async (event) => {
      const ownerInfo = {
        owner: {
          name: 'any name',
          email: 'div.jo2022@gamil.com',
          phone: '972597529501',
        },
        amount: 35 * 100,
        currency: 'usd',
      };

      try {
        const result = await this.stripe?.createSource(card!, ownerInfo);
        console.log(result);
      } catch (err) {
        console.log('----------------');
        console.log(err);
      }
    });
  }
}
