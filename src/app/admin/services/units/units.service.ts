import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropDown } from '../../interfaces';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  status: DropDown[] = [
    { name: 'Free', code: 'free' },
    { name: 'Paid', code: 'paid' },
  ];
  languages: DropDown[] = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'sp' },
    { name: 'France', code: 'fr' },
  ];

  private approach = new BehaviorSubject<DropDown[]>([]);
  public approach$ = this.approach.asObservable();

  store = getFirestore(initializeApp(environment.firebaseConfig));
  constructor(private firebase: AngularFirestore, private storage: Storage) {
    this.getApproaches();
  }

  async getApproaches() {
    let refColl = collection(this.store, 'approaches');
    let getData = await getDocs(refColl);
    let arr: DropDown[] = [];
    getData.docs.forEach((doc: any) => {
      arr.push(doc.data());
    });
    this.approach.next(arr);
  }
}
