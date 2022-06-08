import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { FormsfireService } from 'src/app/admin/services/forms/formsfire.service';
import { TabsadminService } from 'src/app/admin/services/Tabs/tabsadmin.service';
import { UnitsService } from 'src/app/admin/services/units/units.service';

@Component({
  selector: 'app-edit-infogrphics',
  templateUrl: './edit-infogrphics.component.html',
  styleUrls: ['./edit-infogrphics.component.css'],
})
export class EditInfogrphicsComponent implements OnInit {
  @Output() editSuccess = new EventEmitter<any>();
  @Input() infographics: any;
  coverReader: string = '';
  coverEvent: any = false;
  isLoadUpload: boolean = false;
  approachCaty: any = {};
  formValue: any;
  toRemove: any;

  constructor(
    public tab: TabsadminService,
    public units: UnitsService,
    private storage: Storage,
    private fires: FormsfireService
  ) {}

  ngOnInit(): void {
    let { cover, approach, category } = this.infographics;
    this.toRemove = this.infographics;
    this.coverReader = cover;
    this.coverEvent = cover;
    this.approachCaty = {
      approach,
      category,
    };
  }

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
    if (this.coverEvent.name) {
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
          await getDownloadURL(upload.snapshot.ref).then((url: string) => {
            this.saveData(url);
          });
        }
      );
    } else {
      this.saveData(this.infographics.cover);
    }
  }

  saveData(cover: string) {
    let { title, description, language, status } = this.formValue;
    let data = {
      ...this.infographics,
      ...this.approachCaty,
      cover,
      title,
      description,
      status,
      language,
    };

    this.fires.updateInfograpics(data).then(() => {
      let { cover } = this.toRemove;
      if (this.coverEvent.name) {
        deleteObject(ref(this.storage, cover));
      }
      this.clearUpload();
    });
  }

  clearUpload() {
    this.isLoadUpload = false;
    this.editSuccess.emit();
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
