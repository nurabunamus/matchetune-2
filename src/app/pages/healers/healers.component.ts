import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class HealersComponent {
  list: any[] = [];
  isLoader: boolean = true;
  lastIndex: any;
  emptyData: boolean = false;
  isScrolling: boolean = false;
  loadMore: boolean = false;
  isLogged: any;
  isAccess: boolean = false;
  display: boolean = false;
  loader: boolean = true;

  constructor(private functions: FunctionsService, private router: Router) {
    this.getHealers();
    functions.isDataLogged$.subscribe((res) => {
      this.isLogged = res;
      this.loader = false;
    });
  }

  checkRoute(id: string) {
    if (this.isLogged.type === 'patient' && this.isLogged.state === 'success') {
      this.isAccess = false;
      this.router.navigate(['/profile', id]);
    } else {
      this.isAccess = true;
      this.display = true;
    }
  }

  moveROute() {
    console.log(this.isLogged.state);

    if (this.isLogged.state === 'second_info') {
      this.router.navigate(['/details']);
    } else {
      this.router.navigate(['/signup/patient']);
    }
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
}
