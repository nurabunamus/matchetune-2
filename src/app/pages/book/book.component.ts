import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  book: any;
  view: any;
  isShowDownload: boolean = false;
  recommendedBooks: any[] = [];

  viewBook: boolean = false;
  loadedBook: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fires: FunctionsService,
    public functions: FunctionsService
  ) {}

  // when book loaded
  isLoadedBook() {
    this.loadedBook = true;
  }

  // for show pop book view
  viewPDF() {
    this.viewBook = !this.viewBook;
  }

  async getBooks() {
    this.recommendedBooks = [];
    let refCollInfographics = collection(this.fires.store, 'books');
    let getDataInfographics = await getDocs(
      query(
        refCollInfographics,
        where('approach.name', '==', this.book.approach.name),
        limit(3)
      )
    );
    getDataInfographics.forEach((docRel) => {
      let doc = { id: docRel.id, ...docRel.data() };
      if (this.book.id !== docRel.id) {
        this.recommendedBooks.push(doc);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: any) => {
      this.getDocBook(id);
      this.functions.isDataLogged$.subscribe((res) => {
        if (Object.keys(res).length) {
          this.isShowDownload = true;
        }
      });
    });
  }

  async getDocBook(id: string) {
    try {
      const userDoc = doc(this.functions.store, 'books', id);
      await getDoc(userDoc).then((res) => {
        this.book = { ...res.data(), id: res.id };
        if (this.book?.status.code === 'free') {
          this.isShowDownload = true;
        }
        this.getBooks();
      });
    } catch {}
  }
}
