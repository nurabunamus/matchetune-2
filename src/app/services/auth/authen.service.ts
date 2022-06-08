import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface Logged {
  state: boolean;
  type: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  constructor(private auth: AngularFireAuth) {}

  public isLogged = new BehaviorSubject<Logged>({
    state: false,
    type: 'user',
    id: 'id uid hgere',
  });

  public isLogged$ = this.isLogged.asObservable();

  async loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result: any) {
        // This gives you a Facebook Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      });
  }

  async loginWithGoogle() {
    const authGoogle = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(authGoogle).then((res) => {
      console.log(res);
      console.log(this.auth);
      alert('login successfully :)');
    });
  }
}
