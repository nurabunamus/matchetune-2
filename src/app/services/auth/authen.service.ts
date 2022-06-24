import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

}
