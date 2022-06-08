import { Component } from '@angular/core';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { fromEvent } from 'rxjs';
import { Subscribers } from '../../interfaces';
import { FormsfireService } from '../../services/forms/formsfire.service';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent {
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  subscibers: Subscribers[] = [];
  loadMore: boolean = false;
  isScrolling: boolean = false;

  constructor(public tab: TabsadminService, private fires: FormsfireService) {
    this.tab.setCurrentTab('subscribers');
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
      let refColl = collection(this.fires.store, 'subscribers');
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
        getData.forEach((book: any) => {
          let doc = { id: book.id, ...book.data() };
          this.subscibers.push(doc);
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
}
