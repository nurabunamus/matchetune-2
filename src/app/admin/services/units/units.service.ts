import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropDown } from '../../interfaces';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
  ];

  private approach = new BehaviorSubject<DropDown[]>([]);
  public approach$ = this.approach.asObservable();
  private isAdmin = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin.asObservable();

  store = getFirestore(initializeApp(environment.firebaseConfig));
  constructor(private auth: AngularFireAuth, private router: Router) {
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

  checkIsAdmin() {
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        let { email } = user;
        let check = [
          'div.jo2022@gmail.com',
          'noorin.sa.99@gmail.com',
          'javier@matchetune.com',
        ].includes(email);
        this.isAdmin.next(check);
      }
    });
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/admin']).then(() => {
      window.location.reload();
    });
  }

  async loginWithGoogle() {
    const authGoogle = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(authGoogle).then((res) => {
      let email = res.user?.email || '';
      let check = [
        'div.jo2022@gmail.com',
        'noorin.sa.99@gmail.com',
        'javier@matchetune.com',
      ].includes(email);
      this.isAdmin.next(check);
    });
  }
}
