import { Component } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css'],
})
export class PatientregisterComponent {
  tab: number = 1;
  isLoadSign: boolean = false;
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

  constructor(
    private functions: FunctionsService,
    private storage: Storage,
    private router: Router
  ) {
    this.functions.isDataLogged$.subscribe((res) => {
      this.functions.getStatePatient().then((res: any) => {
        res.state === 'register'
          ? (this.tab = 2)
          : res.state === 'to_paid'
          ? this.router.navigate(['/checkout'])
          : (this.tab = 1);
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
    this.isLoadSign = true;
    this.functions.addPatient(this.firstData).then(() => {
      this.isLoadSign = false;
      this.tab = 2;
    });
  }

  saveSecondStep(form: any) {
    this.isLoadSign = true;
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
            this.isLoadSign = false;
            this.router.navigate(['/checkout']);
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
}
