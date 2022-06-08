import { HttpClient } from '@angular/common/http';
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
import { map } from 'rxjs';
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
  constructor(
    private route: ActivatedRoute,
    private fires: FunctionsService,
    public functions: FunctionsService,
    private http: HttpClient
  ) {}

  viewPDF() {
    // window.open(this.book.file, '_blank');
    // let url = this.book.file;
    console.log(this.book.file);
    // let reader: any = new FileReader();
    // reader.readAsDataURL(url);
    // reader.onload = (_event: Event) => {
    //   this.view = reader.result;
    //   console.log(reader.result);
    //   console.log(reader.result);
    // };
  }

  async getBooks() {
    this.recommendedBooks = [];
    let refCollInfographics = collection(this.fires.store, 'books');
    let getDataInfographics = await getDocs(
      query(
        refCollInfographics,
        where('approach.name', '==', this.book.approach.name),
        limit(6)
      )
    );

    getDataInfographics.forEach((book) => {
      let doc = { id: book.id, ...book.data() };
      this.recommendedBooks.push(doc);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: any) => {
      this.getDocBook(id).then;
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
        this.book = res.data();
        if (this.book?.status.code === 'free') {
          this.isShowDownload = true;
        }

        this.getBooks();
      });
    } catch {}
  }
}
