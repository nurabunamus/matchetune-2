import { Component } from '@angular/core';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';
import { Storage } from '@angular/fire/storage';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { deleteObject, ref } from 'firebase/storage';
import { fromEvent } from 'rxjs';
import { UnitsService } from '../../services/units/units.service';

@Component({
  selector: 'app-infographics',
  templateUrl: './infographics.component.html',
  styleUrls: ['./infographics.component.css'],
})
export class InfographicsComponent {
  isAddBook: boolean = false;
  isEdit: boolean = false;
  isHiddenTable: boolean = false;
  listBooks: any[] = [];
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  loadMore: boolean = false;
  isScrolling: boolean = false;
  editInfograpics: any;

  constructor(
    public tab: TabsadminService,
    public unit: UnitsService,
    private storage: Storage,
    private messageService: MessageService
  ) {
    this.tab.setCurrentTab('infographics');
    this.getDataTable();
  }

  addedSuccess() {
    this.isAddBook = false;
    this.whenEvent();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The book has been successfully added',
    });
  }

  whenEvent() {
    this.listBooks = [];
    this.lastIndex = null;
    this.isHiddenTable = false;
    this.getDataTable();
  }

  editSuccess() {
    this.whenEvent();
    this.isEdit = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The book has been successfully Edit',
    });
  }

  ngAfterViewInit() {
    fromEvent(window, 'scroll').subscribe((e: Event) => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.scrollingElement || document.documentElement;
      if (
        clientHeight + scrollTop >= scrollHeight - 50 &&
        !this.loadMore &&
        !this.emptyData
      ) {
        this.loadMore = true;
        this.isScrolling = true;
        this.getDataTable();
      }
    });
  }

  async getDataTable() {
    try {
      let refColl = collection(this.unit.store, 'infographics');
      let q;
      if (this.lastIndex) {
        q = query(refColl, limit(30), startAfter(this.lastIndex));
      } else {
        q = query(refColl, limit(30));
      }
      let getData = await getDocs(q);
      this.lastIndex = getData.docs[getData.docs.length - 1];
      if (getData.empty) {
        this.emptyData = true;
      } else {
        getData.forEach((book) => {
          let doc = { id: book.id, ...book.data() };
          this.listBooks.push(doc);
        });
      }
    } catch (err) {
      console.log({ providerErr: err });
    } finally {
      if (this.isScrolling) {
        this.loadMore = false;
      }
      this.isLoader = false;
    }
  }

  toggleAdded() {
    this.isHiddenTable = true;
    this.isAddBook = true;
  }

  toggleOut() {
    this.isAddBook = false;
    this.isHiddenTable = false;
    this.isEdit = false;
  }

  async removeRow(item: any) {
    let { id, cover } = item;
    const desertCover = ref(this.storage, cover);
    try {
      deleteObject(desertCover);
      await deleteDoc(doc(this.unit.store, 'infographics', id)).then(() => {
        this.listBooks = this.listBooks.filter((e) => e.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'deleted book',
        });
      });
    } catch (err) {
      this.messageService.add({
        severity: 'success',
        summary: 'Error Remove Book',
        detail: 'contact with developers',
      });
    }
  }

  editRow(item: any) {
    this.editInfograpics = item;
    this.isHiddenTable = !this.isHiddenTable;
    this.isEdit = true;
  }
}
