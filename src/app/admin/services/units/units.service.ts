import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropDown } from '../../interfaces';
import { Storage } from '@angular/fire/storage';
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
    { name: 'France', code: 'fr' },
  ];

  private approach = new BehaviorSubject<DropDown[]>([]);
  public approach$ = this.approach.asObservable();
  private isAdmin = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin.asObservable();

  store = getFirestore(initializeApp(environment.firebaseConfig));
  constructor(
    private storage: Storage,
    private auth: AngularFireAuth,
    private router: Router
  ) {
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
        let { uid, email } = user;
        console.log('uid, email');
        console.log(uid, email);
        let check = ['div.jo2022@gmail.com'].includes(email);
        let chec2 = ['gUw7bngGd8PlGw5XxACNfpYJ6zx2'].includes(uid);
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
      let uid = res.user?.uid || '';
      let check = ['div.jo2022@gmail.com'].includes(email);
      let chec2 = ['gUw7bngGd8PlGw5XxACNfpYJ6zx2'].includes(uid);
      this.isAdmin.next(check);
    });
  }
}
