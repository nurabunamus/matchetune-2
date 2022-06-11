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
import { UnitsService } from 'src/app/admin/services/units/units.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ListsService } from 'src/app/services/lists/lists.service';

@Component({
  selector: 'app-infographics',
  templateUrl: './infographics.component.html',
  styleUrls: ['./infographics.component.css'],
})
export class InfographicsComponent implements OnInit {
  loader: boolean = true;
  empty: boolean = false;
  lastIndex: any = 0;
  isScrolling: boolean = false;
  loadMore: boolean = false;
  approaches: any[] = [];
  language: any;
  status: any;
  approach: any;
  category: any;
  Infographics: any[] = [];
  constructor(
    public units: UnitsService,
    public list: ListsService,
    private fires: FunctionsService
  ) {
    this.getFiltersResults();
    this.units.approach$.subscribe((change) => {
      this.approaches = change;
    });
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
        this.getFiltersResults();
      }
    });
  }

  // rest details when eny event change
  clearLog() {
    this.Infographics = [];
    this.lastIndex = 0;
    this.loader = true;
    this.empty = false;
    this.isScrolling = false;
    this.loadMore = false;
    this.getFiltersResults();
  }

  // auto call function when any event change
  async getFiltersResults() {
    let { status, language, approach, category } = {
      status: this.status?.code,
      language: this.language?.code,
      approach: this.approach?.code,
      category: this.category?.code,
    };

    let cond1 = status && !language && !approach && !category;
    let cond2 = !status && language && !approach && !category;
    let cond3 = !status && !language && approach && !category;
    let cond4 = !status && !language && approach && category;
    let cond5 = status && language && approach && category;
    let cond6 = status && language && !approach && !category;
    let cond7 = !status && language && approach && category;
    let cond8 = status && !language && approach && category;

    let limitNum: number = 15;

    let refColl = collection(this.fires.store, 'infographics');

    let q: any = query(
      refColl,
      orderBy('title'),
      limit(limitNum),
      startAfter(this.lastIndex)
    );

    if (cond1) {
      q = query(
        refColl,
        orderBy('title'),
        where('status.code', '==', status),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond2) {
      q = query(
        refColl,
        orderBy('title'),
        where('language.code', '==', language),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond3) {
      q = query(
        refColl,
        orderBy('title'),
        where('approach.code', '==', approach),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond4) {
      q = query(
        refColl,
        orderBy('title'),
        where('approach.code', '==', approach),
        where('category.code', '==', category),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond5) {
      q = query(
        refColl,
        orderBy('title'),
        where('status.code', '==', status),
        where('language.code', '==', language),
        where('approach.code', '==', approach),
        where('category.code', '==', category),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond6) {
      q = query(
        refColl,
        orderBy('title'),
        where('status.code', '==', status),
        where('language.code', '==', language),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond7) {
      q = query(
        refColl,
        orderBy('title'),
        where('language.code', '==', language),
        where('approach.code', '==', approach),
        where('category.code', '==', category),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    } else if (cond8) {
      q = query(
        refColl,
        orderBy('title'),
        where('status.code', '==', status),
        where('approach.code', '==', approach),
        where('category.code', '==', category),
        limit(limitNum),
        startAfter(this.lastIndex)
      );
    }

    try {
      let getData = await getDocs(q);
      this.lastIndex = getData.docs[getData.docs.length - 1];
      if (getData.empty) {
        this.empty = true;
        this.loader = false;
      }
      getData.forEach((img: any) => {
        let doc = { id: img.id, ...img.data() };
        this.Infographics.push(doc);
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

  ngOnInit(): void {}
}
