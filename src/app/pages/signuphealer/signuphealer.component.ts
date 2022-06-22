import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuphealer',
  templateUrl: './signuphealer.component.html',
  styleUrls: ['./signuphealer.component.css'],
})
export class SignuphealerComponent implements OnInit {
  tab: number = 1;
  isValid: boolean = false;
  showPass: boolean = false;
  data: any;
  avatarEvent: any;
  coverReader: string = '';
  resumeEvent: any;
  isLoaderAdd: boolean = false;

  constructor(
    private storage: Storage,
    private functions: FunctionsService,
    private route: Router
  ) {}

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

  uploadResume(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.resumeEvent = file[0];
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.value);
      this.data = { ...this.data, ...form.value };
      this.tab = 2;
    } else {
      this.isValid = true;
    }
  }

  onSubmit2(form: any) {
    if (form.valid && this.avatarEvent && this.resumeEvent) {
      this.isValid = false;
      this.data = { ...this.data, ...form.value };
      this.isLoaderAdd = true;
      this.addHealerFires();
    } else {
      this.isValid = true;
    }
  }

  addHealerFires() {
    const pathAvatar = `healers/avatar/${Date.now()}_${this.avatarEvent.name.replace(
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
        await getDownloadURL(upload.snapshot.ref).then((urlAVatar) => {
          this.continueToResume(urlAVatar);
        });
      }
    );
  }

  continueToResume(urlAVatar: string) {
    const pathResume = `healers/resume/${Date.now()}_${this.resumeEvent.name.replace(
      /([^a-z0-9.]+)/gi,
      ''
    )}`;
    const storageFile = ref(this.storage, pathResume);
    const upload = uploadBytesResumable(storageFile, this.resumeEvent);
    upload.on(
      'state_changed',
      () => console.log('upload resume'),
      (err) => console.log(err),
      async () => {
        await getDownloadURL(upload.snapshot.ref).then((urlResume) => {
          this.continueToSaveData(urlAVatar, urlResume);
        });
      }
    );
  }

  continueToSaveData(urlAVatar: string, urlResume: string) {
    let {
      name,
      email,
      password,
      id_number,
      phone_number,
      profession_name,
      linkedin,
      social_media,
    } = this.data;
    let data = {
      DOJ: Date.now(),
      avatar: urlAVatar,
      resume: urlResume,
      name,
      email,
      password,
      id_number,
      phone_number,
      profession_name,
      linkedin,
      social_media,
      type: 'healer',
    };

    this.functions.addHealer(data).then(() => {
      this.isLoaderAdd = false;
      this.route.navigate(['/profile']);
    });
  }

  showPassFun() {
    this.showPass = !this.showPass;
  }

  ngOnInit(): void {}
}
