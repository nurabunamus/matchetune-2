import { Component, Output, EventEmitter } from '@angular/core';
import { FormsfireService } from 'src/app/admin/services/forms/formsfire.service';
import { TabsadminService } from 'src/app/admin/services/Tabs/tabsadmin.service';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { UnitsService } from 'src/app/admin/services/units/units.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css'],
})
export class AddvideoComponent {
  @Output() addedSuccess = new EventEmitter<any>();
  coverReader: string = '';
  coverEvent: any = false;
  bookEvent: any = false;
  isLoadUpload: boolean = false;
  approachCaty: any = {};
  formValue: any;

  constructor(
    public tab: TabsadminService,
    public units: UnitsService,
    private storage: Storage,
    private fires: FormsfireService
  ) {}

  getApproachCaty(item: any) {
    this.approachCaty = item;
  }

  async onSubmit(form: any) {
    let { language, status, title, description } = form.value;
    if (
      !Object.keys(this.approachCaty).length ||
      !form.valid ||
      !status ||
      !language ||
      !title ||
      !description ||
      !this.coverEvent ||
      !this.bookEvent
    ) {
      return alert('enter all inputs, cover and video');
    }
    this.formValue = form.value;
    this.uploadCover();
  }

  async uploadCover() {
    const path = `videos/covers/${Date.now()}_${this.coverEvent.name.replace(
      /([^a-z0-9.]+)/gi,
      ''
    )}`;
    const storageFile = ref(this.storage, path);
    const upload = uploadBytesResumable(storageFile, this.coverEvent);
    upload.on(
      'state_changed',
      () => (this.isLoadUpload = true),
      (err) => console.log(err),
      async () => {
        await getDownloadURL(upload.snapshot.ref).then((url: string) => {
          this.uploadBook(url);
        });
      }
    );
  }

  uploadBook(cover: string) {
    const path = `videos/files/${Date.now()}_${this.bookEvent.name.replace(
      /([^a-z0-9.]+)/gi,
      ''
    )}`;
    const storageFile = ref(this.storage, path);
    const upload = uploadBytesResumable(storageFile, this.bookEvent);
    upload.on(
      'state_changed',
      () => null,
      (err) => console.log(err),
      async () => {
        await getDownloadURL(upload.snapshot.ref).then((url: string) => {
          this.saveData(cover, url);
        });
      }
    );
  }

  saveData(cover: string, file: string) {
    let { title, description, language, status } = this.formValue;
    let data = {
      ...this.approachCaty,
      TTA: Date.now(),
      cover,
      file,
      title,
      description,
      status,
      language,
    };
    this.fires.addVideo(data).then(() => {
      this.clearUpload();
    });
  }

  clearUpload() {
    this.isLoadUpload = false;
    this.addedSuccess.emit();
  }

  readerCover(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.coverEvent = file[0];
    var reader: any = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event: Event) => {
      this.coverReader = reader.result;
    };
  }

  pickBook(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.bookEvent = file[0];
  }

  removeCover() {
    this.coverReader = '';
    this.coverEvent = null;
  }

  removeBook() {
    this.bookEvent = null;
  }
}
