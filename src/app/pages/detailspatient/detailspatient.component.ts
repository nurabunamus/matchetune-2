import { Component } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailspatient',
  templateUrl: './detailspatient.component.html',
  styleUrls: ['./detailspatient.component.css'],
})
export class DetailspatientComponent {
  constructor(
    private functions: FunctionsService,
    private storage: Storage,
    private router: Router
  ) {
    functions.isDataLogged$.subscribe((res: any) => {
      if (res.state === 'success') {
        this.router.navigate(['profile']);
      } else if (res.state === 'checkout') {
        this.router.navigate(['checkout']);
      } else if (res.state === 'repaid') {
        this.router.navigate(['repaid']);
      }
    });
  }
  isLoadSign: boolean = false;
  isValid: boolean = false;
  coverReader: string = '';
  age: string = '';
  sex: string = '';
  avatarEvent: any;
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

  saveSecondStep(form: any): any {
    console.log(form.valid);
    console.log(this.age && this.sex);

    if (!form.valid || !this.avatarEvent || !this.age || !this.sex) {
      return (this.isValid = true);
    } else {
      this.isValid = false;
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
            let { country, phone, age, sex } = form.value;
            let data = {
              avatar,
              state: 'checkout',
              country,
              phone,
              age,
              sex: sex?.code,
            };
            this.functions.updateDetailsPatient(data).then(() => {
              this.router.navigate(['/checkout']).then(() => {
                location.reload();
              });
            });
          });
        }
      );
    }
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
