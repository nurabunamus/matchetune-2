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
  URL: string = 'https://us-central1-matchune.cloudfunctions.net/app';
  // URL: string = 'http://localhost:5001/matchune/us-central1/app';

  //
  private isOpenPopSignup = new BehaviorSubject<boolean>(false);
  public isOpenPopSignup$ = this.isOpenPopSignup.asObservable();
  store = getFirestore(initializeApp(environment.firebaseConfig));

  //
  private checkRoute = new BehaviorSubject<any>(null);
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

  // logout accounts
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }

  // get authentication
  checkAuthentication() {
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        let { uid } = user;
        this.getTypeUser(uid);
      } else {
        this.isLogged.next(false);
        this.checkRoute.next(false);
      }
    });
  }

  // login by email and password
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
      this.dataLogged.next({ ...docSnap.data(), id: uid });
      let { state } = docSnap.data();
      if (state === 'second_info') {
        this.router.navigate(['details']);
      } else if (state === 'checkout') {
        this.router.navigate(['checkout']);
      } else if (state === 'repaid') {
        this.router.navigate(['repaid']);
      } else {
        this.checkRoute.next(true);
      }
    } else {
      const userDoc = doc(this.store, 'healers', uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        this.dataLogged.next({ ...docSnap.data(), id: uid });
      }
    }
    this.isLogged.next(true);
  }

  // check if user have access
  checkAccess() {
    let { state, type } = this.dataLogged.getValue();
    if ((!state && type === 'patient') || (!state && !type)) {
      this.router.navigate(['/signup/patient']);
    }
    if (state === 'second_info') {
      this.router.navigate(['details']);
    } else if (state === 'checkout') {
      this.router.navigate(['checkout']);
    } else if (state === 'repaid') {
      this.router.navigate(['repaid']);
    }
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
        return this.firebase
          .collection('healers')
          .doc(user?.uid)
          .set({ ...data, id: user?.uid });
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

  // chat contacts patients
  async updateContactsPatient(data: any) {
    return this.firebase
      .collection('patients')
      .doc(this.dataLogged.getValue().id)
      .update(data);
  }

  // chat contacts healers
  async updateContactsHealer(id: any) {
    this.firebase
      .collection('healers')
      .doc(id)
      .get()
      .subscribe((res: any) => {
        let contacts = res.data().contacts || [];
        this.firebase
          .collection('healers')
          .doc(id)
          .update({
            contacts: [
              ...new Set([...contacts, this.dataLogged.getValue().id]),
            ],
          })
          .then(() => {
            this.router.navigate(['/profile', id]).then(() => {
              location.reload();
            });
          });
      });
  }

  // Recover Password
  forgotPassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['verify']);
      },
      (error) => {
        alert(
          'This email has no registered account! Please, create a new account.'
        );
      }
    );
  }
}
