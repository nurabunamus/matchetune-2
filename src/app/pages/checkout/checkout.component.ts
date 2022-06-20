import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private stripe: Stripe | null;
  isLoadSign: boolean = false;
  user: any;
  constructor(private functions: FunctionsService) {
    functions.isDataLogged$.subscribe((res) => {
      this.user = res;
      console.log(res);
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51LAfpgJJXXwqLUlGuHy2b3JwNZ556zqI7LILIKbjBUPFDgm6vDNh6l7yEr5wObxdEPggUZEnjkkbIn28Pycn3g4a00suOL159G'
    );
    const elements = this.stripe?.elements();
    const card = elements?.create('card');
    card?.mount('#card');
    card?.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError!.textContent = event.error.message;
        this.isLoadSign = false;
      } else {
        displayError!.textContent = '';
      }
    });
    const button = document.getElementById('button-paid');
    button?.addEventListener('click', async (event) => {
      this.isLoadSign = true;
      const ownerInfo = {
        owner: {
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
        },
        amount: 9 * 100,
        currency: 'usd',
      };

      try {
        const result = await this.stripe?.createSource(card!, ownerInfo);
        this.functions.checkPaid(result).subscribe((res: any) => {
          console.log(res);
          if (res.type === 'success') {
            alert('done to paid');
            // set values to firebase
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}
