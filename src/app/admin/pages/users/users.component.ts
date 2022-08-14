import { Component, OnInit } from '@angular/core';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { fromEvent } from 'rxjs';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';
import { FormsfireService } from '../../services/forms/formsfire.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  healers: any[] = [];
  loadMore: boolean = false;
  isScrolling: boolean = false;

  constructor(public tab: TabsadminService, private Fires: FormsfireService) {
    this.tab.setCurrentTab('users');
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
      let refColl = collection(this.Fires.store, 'patients');
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
