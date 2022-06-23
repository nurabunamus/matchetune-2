import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  //
  private isOpenPopSignup = new BehaviorSubject<boolean>(false);
  public isOpenPopSignup$ = this.isOpenPopSignup.asObservable();
  store = getFirestore(initializeApp(environment.firebaseConfig));

  //
  private checkRoute = new BehaviorSubject<any>({ state: 'check' });
  public checkRoute$ = this.checkRoute.asObservable();
  //
  private dataLogged = new BehaviorSubject<any>({});
  public isDataLogged$ = this.dataLogged.asObservable();
  //
  private isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLogged.asObservable(); 
  private isAccess = new BehaviorSubject<boolean>(false);
  public isAccess$ = this.isAccess.asObservable();
  fireauth: any;

  constructor(
    private firebase: AngularFirestore,
    private auth: AngularFireAuth,
    private http: HttpClient,
    private router: Router
  ) {}

  get isOpenSign(): boolean {
    return this.isOpenPopSignup.getValue();
  }

  private set isOpenSign(val: boolean) {
    this.isOpenPopSignup.next(val);
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
        this.getTypeUser(uid);
      } else {
        this.isLogged.next(false);
        this.checkRoute.next({ state: false });
      }
    });
  }

  async checkLogin(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        if (user.uid) {
          return user.uid;
        }
      })
      .catch(() => {
        return false;
      });
  }

  async getTypeUser(uid: string) {
    const userDoc = doc(this.store, 'patients', uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      console.log(' i am a patients patients');
      this.dataLogged.next({ ...docSnap.data(), id: uid });
      let { state } = docSnap.data();
      if (state === 'second_info') {
        this.router.navigate(['details']);
      } else if (state === 'checkout') {
        this.router.navigate(['checkout']);
      } else if (state === 'repaid') {
        this.router.navigate(['repaid']);
      }
      this.checkRoute.next({ state: true });
    } else {
      const userDoc = doc(this.store, 'healers', uid);
      const docSnap = await getDoc(userDoc);
      this.dataLogged.next({ ...docSnap.data(), id: uid });
      this.checkRoute.next({ state: true });
    }
    this.isLogged.next(true);
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
        return this.firebase.collection('healers').doc(user?.uid).set(data);
      });
  }

  async addPatient(data: any) {
    let { email, password, name } = data;
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.firebase.collection('patients').doc(user?.uid).set({
          id: user?.uid,
          DOJ: Date.now(),
          email,
          name,
          state: 'second_info',
          type: 'patient',
        });
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async updateDetailsPatient(data: any) {
    return this.firebase
      .collection('patients')
      .doc(this.dataLogged.getValue().id)
      .update(data);
  }

  // URL: string = 'https://us-central1-matchune.cloudfunctions.net/app';
  URL: string = 'http://localhost:5001/matchune/us-central1/app';

  getFilters(type: string, data: any) {
    return this.http.post(`${this.URL}/filters`, {
      type,
      options: data,
    });
  }

  checkPaid(data: any) {
    return this.http.post(`${this.URL}/stripe`, data);
  }

  async updateIsPaid(data: any) {
    return this.firebase
      .collection('patients')
      .doc(this.dataLogged.getValue().id)
      .update(data);
  }

  // Recover Password
  forgotPassword(email : string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
     this.router.navigate(['verify'])
    },
    error => {
      alert('This email has no registered account! Please, create a new account.')
    })
  }

}
