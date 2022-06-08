import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsfireService } from '../../../services/forms/formsfire.service';
import { TabsadminService } from '../../../services/Tabs/tabsadmin.service';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { UnitsService } from 'src/app/admin/services/units/units.service';
import { Storage } from '@angular/fire/storage';
import { deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Output() editSuccess = new EventEmitter<any>();
  @Input() book: any;
  coverReader: string = '';
  coverEvent: any = false;
  bookEvent: any = false;
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
    let { cover, file, approach, category } = this.book;
    this.toRemove = this.book;
    this.coverReader = cover;
    this.coverEvent = cover;
    this.bookEvent = file;
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
      !this.coverEvent ||
      !this.bookEvent
    ) {
      return alert('enter all inputs, cover and book');
    }
    this.formValue = form.value;
    this.uploadCover();
  }

  async uploadCover() {
    if (this.coverEvent.name) {
      const path = `books/covers/${Date.now()}_${this.coverEvent.name.replace(
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
    } else {
      this.uploadBook(this.book.cover);
    }
  }

  uploadBook(cover: string) {
    if (this.bookEvent.name) {
      const path = `books/files/${Date.now()}_${this.bookEvent.name.replace(
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
    } else {
      this.saveData(cover, this.book.file);
    }
  }

  saveData(cover: string, file: string) {
    let { title, description, language, status } = this.formValue;
    let data = {
      ...this.book,
      ...this.approachCaty,
      cover,
      file,
      title,
      description,
      status,
      language,
    };

    this.fires.updateBook(data).then(() => {
      let { cover, file } = this.toRemove;
      if (this.coverEvent.name) {
        deleteObject(ref(this.storage, cover));
      }
      if (this.bookEvent.name) {
        deleteObject(ref(this.storage, file));
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

  pickBook(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.bookEvent = file[0];
  }

  removeBook() {
    this.bookEvent = null;
  }
}
