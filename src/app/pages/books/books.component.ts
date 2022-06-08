import { Component, OnInit } from '@angular/core';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { fromEvent } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ListsService } from 'src/app/services/lists/lists.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  loader: boolean = true;
  empty: boolean = false;
  lastIndex: any = 0;
  isScrolling: boolean = false;
  loadMore: boolean = false;
  approach: any = 'all';
  categories: any = 'all';
  language: any;
  status: any;
  Books: any[] = [];

  constructor(public list: ListsService, private fires: FunctionsService) {
    this.getData();
  }

  onChangeApproach(event: any) {
    this.approach = event.value.code === 'all' ? 'all' : event.value;
    this.categories = 'all';
    this.clearLog();
  }

  onChangeCategories(event: any) {
    this.categories = event.value;
    this.clearLog();
  }

  onChangeLanguage(event: any) {
    this.language = event.value;
    this.clearLog();
  }

  onChangeStatus(event: any) {
    this.status = event.value;
    this.clearLog();
  }

  clearLog() {
    this.Books = [];
    this.lastIndex = 0;
    this.loader = true;
    this.empty = false;
    this.isScrolling = false;
    this.loadMore = false;
    this.getData();
  }

  async getData() {
    let approach = this.approach?.code === 'all' ? false : this.approach?.code,
      categories =
        this.categories === 'all'
          ? []
          : this.categories.map((i: any) => {
              return i.code;
            }),
      language = this.language?.code === 'all' ? false : this.language?.code,
      status = this.status?.code === 'all' ? false : this.status?.code;

    let cond1 = approach && !categories.length && language && status;
    let cond2 = approach && !categories.length && !language && !status;
    let cond3 = !approach && !categories.length && language && !status;
    let cond4 = !approach && !categories.length && !language && status;
    let cond5 = !approach && !categories.length && language && status;
    let limitNum = 9;

    let refColl = collection(this.fires.store, 'books');
    let q: any = query(
      refColl,
      orderBy('title'),
      limit(limitNum),
      startAfter(this.lastIndex)
    );

    if (cond1) {
      q = query(
        refColl,
        orderBy('approach'),
        where('approach.code', '==', approach),
        where('languages.code', '==', language),
        where('status.code', '==', status),
        startAfter(this.lastIndex),
        limit(limitNum)
      );
    } else if (cond2) {
      q = query(
        refColl,
        orderBy('approach'),
        where('approach.code', '==', approach),
        startAfter(this.lastIndex),
        limit(limitNum)
      );
    } else if (cond3) {
      console.log(cond3, language);
      q = query(
        refColl,
        orderBy('language'),
        where('languages.code', '==', language),
        startAfter(this.lastIndex),
        limit(limitNum)
      );
    } else if (cond4) {
      q = query(
        refColl,
        orderBy('status'),
        where('status.code', '==', status),
        startAfter(this.lastIndex),
        limit(limitNum)
      );
    } else if (cond5) {
      q = query(
        refColl,
        orderBy('status'),
        where('languages.code', '==', language),
        where('status.code', '==', status),
        startAfter(this.lastIndex),
        limit(limitNum)
      );
    }

    try {
      let getDataBooks = await getDocs(q);
      this.lastIndex = getDataBooks.docs[getDataBooks.docs.length - 1];
      console.log(getDataBooks.docs.length);
      if (getDataBooks.empty) {
        this.empty = true;
        this.loader = false;
      }
      getDataBooks.forEach((book: any) => {
        let doc = { id: book.id, ...book.data() };
        this.Books.push(doc);
      });
      this.loader = false;
    } catch (err) {
      console.log(err);
    } finally {
      if (this.isScrolling) {
        this.loadMore = false;
      }
    }
  }

  // for infinty scrolling and get data

  ngAfterViewInit() {
    fromEvent(window, 'scroll').subscribe((e: Event) => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.scrollingElement || document.documentElement;
      if (
        clientHeight + scrollTop >= scrollHeight - 50 &&
        !this.loadMore &&
        !this.empty
      ) {
        this.loadMore = true;
        this.isScrolling = true;
        console.log('go');
        this.getData();
      }
    });
  }

  ngOnInit(): void {}
}
