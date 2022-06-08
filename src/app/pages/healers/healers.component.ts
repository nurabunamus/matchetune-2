import { Component, OnInit } from '@angular/core';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { fromEvent } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-healers',
  templateUrl: './healers.component.html',
  styleUrls: ['./healers.component.css'],
})
export class HealersComponent implements OnInit {
  list: any[] = [];
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  isScrolling: boolean = false;
  loadMore: boolean = false;

  constructor(private functions: FunctionsService) {
    this.getHealers();
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
        this.getHealers();
      }
    });
  }

  async getHealers() {
    try {
      let refColl = collection(this.functions.store, 'healers');
      let q;
      if (this.lastIndex) {
        q = query(refColl, limit(20), startAfter(this.lastIndex));
      } else {
        q = query(refColl, limit(20));
      }
      let getData = await getDocs(q);
      this.lastIndex = getData.docs[getData.docs.length - 1];
      if (getData.empty) {
        this.emptyData = true;
      } else {
        getData.forEach((book) => {
          let doc = { id: book.id, ...book.data() };
          console.log(doc);
          
          this.list.push(doc);
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
