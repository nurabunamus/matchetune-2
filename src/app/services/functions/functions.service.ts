import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { DropDown } from 'src/app/admin/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  private isOpenPopSignup = new BehaviorSubject<boolean>(false);
  public isOpenPopSignup$ = this.isOpenPopSignup.asObservable();
  store = getFirestore(initializeApp(environment.firebaseConfig));

  private dataLogged = new BehaviorSubject<any>({});
  public isDataLogged$ = this.dataLogged.asObservable();
  private isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLogged.asObservable();

  constructor(
    private firebase: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  get isOpenSign(): boolean {
    return this.isOpenPopSignup.getValue();
  }

  private set isOpenSign(val: boolean) {
    this.isOpenPopSignup.next(val);
  }

  testEventAnalytics() {
    console.log('add event');

    // this.firebase.
  }

  addEmailSubscribe(email: string) {
    return this.firebase.collection('subscribers').add(email);
  }

  togglePopSignup() {
    this.isOpenSign = !this.isOpenSign;
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  checkAuthentication() {
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        let { uid } = user;
        console.log(uid);
        const userDoc = doc(this.store, 'patients', uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          this.dataLogged.next({ ...docSnap.data(), id: uid });
        } else {
          const userDoc = doc(this.store, 'healers', uid);
          const docSnap = await getDoc(userDoc);
          this.dataLogged.next({ ...docSnap.data(), id: uid });
        }
        this.isLogged.next(true);
      } else {
        console.log(' no authentication');
        this.isLogged.next(false);
      }
    });
  }

  async getProfilePatient(id: string) {
    const userDoc = doc(this.store, 'patients', id);
    const docSnap = await getDoc(userDoc);
    return docSnap.data();
  }

  async addHealer(data: any) {
    let { email, password } = data;
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user?.uid);
        return this.firebase.collection('healers').doc(user?.uid).set(data);
      });
  }

}
