import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css'],
})
export class PatientregisterComponent implements OnInit {
  private stripe: Stripe | null;
  tab: number = 1
  isValid: boolean = false;
  showPass: boolean = false;
  firstData: any;
  coverReader: string = '';
  avatarEvent: any;
  age: any;
  sex: any;
  country: any;
  phone: any;
  sexArr: any = [
    {
      name: 'Male',
      code: 'male',
    },
    {
      name: 'Female',
      code: 'female',
    },
  ];

  constructor(private functions: FunctionsService, private storage: Storage) {
    this.functions.isDataLogged$.subscribe((res) => {
      this.functions.getStatePatient().then((res: any) => {
        res.state === 'register'
          ? (this.tab = 2)
          : res.state === 'to_paid'
          ? (this.tab = 3)
          : (this.tab = 1);

        console.log(res.state);
        console.log(res.state);
        console.log(res.state);

        if (res.state === 'to_paid' && this.stripe) {
          this.callStripe();
        }
      });
    });
  }

  firstRegister(form: any) {
    if (form.valid) {
      this.firstData = form.value;
      this.saveFirstStep();
    } else {
      this.isValid = true;
    }
  }

  saveFirstStep() {
    this.functions.addPatient(this.firstData).then(() => {
      this.tab = 2;
    });
  }

  saveSecondStep(form: any) {
    const pathAvatar = `patients/avatar/${Date.now()}_${this.avatarEvent.name.replace(
      /([^a-z0-9.]+)/gi,
      ''
    )}`;
    const storageFile = ref(this.storage, pathAvatar);
    const upload = uploadBytesResumable(storageFile, this.avatarEvent);
    upload.on(
      'state_changed',
      () => console.log('upload avatar'),
      (err) => console.log(err),
      async () => {
        await getDownloadURL(upload.snapshot.ref).then((avatar) => {
          let data = {
            ...form.value,
            avatar,
            state: 'to_paid',
            sex: form.value.sex,
          };
          this.functions.updatePatient(data).then(() => {
            alert('updated 2');
            this.tab = 3;
          });
        });
      }
    );
  }

  showPassFun() {
    this.showPass = !this.showPass;
  }

  uploadCover(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.avatarEvent = file[0];
    var reader: any = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event: Event) => {
      this.coverReader = reader.result;
    };
  }

  async callStripe() {
    console.log('state stripe ');
    console.log('state stripe ');
    if (this.stripe && this.tab === 3) {
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
          this.functions.checkPaid(result).subscribe((res: any) => {
            console.log(res);
          });
        } catch (err) {
          console.log('----------------');
          console.log(err);
        }
      });
    }
  }

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51LAfpgJJXXwqLUlGuHy2b3JwNZ556zqI7LILIKbjBUPFDgm6vDNh6l7yEr5wObxdEPggUZEnjkkbIn28Pycn3g4a00suOL159G'
    );
  }
}
