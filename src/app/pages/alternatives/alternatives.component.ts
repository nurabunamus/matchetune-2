import { Component, OnInit } from '@angular/core';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { DropDown } from 'src/app/admin/interfaces';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.css'],
})
export class AlternativesComponent implements OnInit {
  infographics: any[] = [];
  videos: any[] = [];
  books: any[] = [];
  selectedCategory: any;
  approach: DropDown[] = [
    { name: 'All', code: 'all' },
    { name: 'Integrative', code: 'integrative' },
    { name: 'Ancestral', code: 'ancestral' },
    { name: 'Chinese', code: 'chinese' },
    { name: 'Western Holistic', code: 'western_holistic' },
  ];
  categories: any = {
    integrative: [
      { name: 'Astrological Chart', code: 'astrological_chart' },
      { name: 'Reiki', code: 'Reiki' },
      { name: 'Pineal Glandule', code: 'pineal_glandule' },
      { name: 'Numerology', code: 'numerology' },
      { name: 'Floral Therapy', code: 'floral_therapy' },
    ],
    ancestral: [
      { name: 'Mapuche', code: 'mapuche' },
      { name: 'Quero', code: 'quero' },
      { name: 'Aymara', code: 'aymara' },
      { name: 'Lykanan Antai', code: 'lykanan_antai' },
    ],
    chinese: [
      { name: 'Acupuncture', code: 'acupuncture' },
      { name: 'Massages', code: 'massages' },
      { name: 'Moxibustion', code: 'moxibustion' },
      { name: 'Herbs', code: 'herbs' },
    ],
    western_holistic: [
      { name: 'Doctors', code: 'doctors' },
      { name: 'Gynecologists', code: 'gynecologists' },
      { name: 'Pediatrics', code: 'pediatrics' },
      { name: 'Psicologists', code: 'psicologists' },
      { name: 'Psiquiatrics', code: 'psiquiatrics' },
    ],
  };
  types: DropDown[] = [
    { name: 'Infographics', code: 'infographics' },
    { name: 'Books', code: 'books' },
    { name: 'Videos', code: 'videos' },
  ];
  languages: DropDown[] = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'sp' },
  ];
  languagesSelected: DropDown[] = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'sp' },
  ];

  form: any;
  isLoader: boolean = true;
  empty: boolean = false;

  constructor(private fires: FunctionsService) {
    this.getDefaultValues();
  }

  sekectApproach(event: any) {
    event.value.code !== 'all'
      ? (this.selectedCategory = event.value)
      : (this.selectedCategory = false);
  }

  async getDefaultValues() {
    // get books
    let refColl = collection(this.fires.store, 'books');
    let getDataBooks = await getDocs(query(refColl, limit(12)));

    if (getDataBooks.docs.length) {
      this.isLoader = false;
    }

    getDataBooks.forEach((book) => {
      let doc = { id: book.id, ...book.data() };
      this.books.push(doc);
    });

    // get infographics
    let refCollInfographics = collection(this.fires.store, 'infographics');
    let getDataInfographics = await getDocs(
      query(refCollInfographics, limit(12))
    );
    getDataInfographics.forEach((book) => {
      let doc = { id: book.id, ...book.data() };
      this.infographics.push(doc);
    });

    if (getDataInfographics.docs.length) {
      this.isLoader = false;
    }

    // get videos
    let refCollvideos = collection(this.fires.store, 'videos');
    let getDatavideos = await getDocs(query(refCollvideos, limit(6)));
    getDatavideos.forEach((book) => {
      let doc = { id: book.id, ...book.data() };
      this.videos.push(doc);
    });
    if (getDatavideos.docs.length) {
      this.isLoader = false;
    }
  }

  search(form: any) {
    console.log(form.valid);

    if (form.valid) {
      this.infographics = [];
      this.videos = [];
      this.books = [];
      this.isLoader = true;

      this.form = form.value;
      let { types } = form.value;
      for (let i = 0; i < types.length; i++) {
        let type = types[i].code;
        if (type === 'books') {
          this.getBooksFilter();
        } else if (type === 'infographics') {
        } else {
        }
      }
    }
  }

  async getBooksFilter() {
    let { label, approach, language, status } = this.form;
    console.log({ label, approach, language });
    let refColl = collection(this.fires.store, 'books');
    let q: any = query(
      refColl,
      where('languages.code', '==', language.code),
      where('approach.code', '==', approach.code),
      limit(12)
    );
    let getDataBooks = await getDocs(q);
    getDataBooks.forEach((book: any) => {
      let doc = { id: book.id, ...book.data() };
      this.books.push(doc);
    });
    if (getDataBooks.empty) {
      this.empty = true;
    }
    this.isLoader = false;
  }

  ngOnInit(): void {}
}

interface Video {
  id: string;
  name: string;
  status: string;
  url: string;
}
