import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { MessageService } from 'primeng/api';
import { fromEvent, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';
import { FormsfireService } from '../../services/forms/formsfire.service';

@Component({
  selector: 'app-healers',
  templateUrl: './healers.component.html',
  styleUrls: ['./healers.component.css'],
})
export class HealersComponent implements OnInit {
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  healers: any[] = [];
  loadMore: boolean = false;
  isScrolling: boolean = false;

  constructor(public tab: TabsadminService, private Fires: FormsfireService) {
    this.tab.setCurrentTab('healers');
    this.getDataTable();
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
      let refColl = collection(this.Fires.store, 'healers');
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
          this.healers.push(doc);
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

  ngOnInit(): void {}
}
