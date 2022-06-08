import { Component, Output, EventEmitter } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FormsfireService } from 'src/app/admin/services/forms/formsfire.service';
import { TabsadminService } from 'src/app/admin/services/Tabs/tabsadmin.service';
import { UnitsService } from 'src/app/admin/services/units/units.service';

@Component({
  selector: 'app-add-infographics',
  templateUrl: './add-infographics.component.html',
  styleUrls: ['./add-infographics.component.css'],
})
export class AddInfographicsComponent {
  @Output() addedSuccess = new EventEmitter<any>();
  coverReader: string = '';
  coverEvent: any = false;
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
      !this.coverEvent
    ) {
      return alert('enter all inputs, cover and infographics');
    }
    this.formValue = form.value;
    this.uploadCover();
  }

  async uploadCover() {
    const path = `infographics/${Date.now()}_${this.coverEvent.name.replace(
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
        await getDownloadURL(upload.snapshot.ref).then((cover: string) => {
          this.saveData(cover);
        });
      }
    );
  }

  saveData(cover: string) {
    let { title, description, language, status } = this.formValue;
    let data = {
      ...this.approachCaty,
      TTA: Date.now(),
      cover,
      title,
      description,
      status,
      language,
    };
    this.fires.addInfographics(data).then(() => {
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

  removeCover() {
    this.coverReader = '';
    this.coverEvent = null;
  }
}
