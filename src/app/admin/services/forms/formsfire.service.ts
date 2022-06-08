import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormsfireService {
  constructor(private storage: Storage, private firebase: AngularFirestore) {}

  store = getFirestore(initializeApp(environment.firebaseConfig));

  addBook(data: any) {
    return this.firebase.collection('books').add(data);
  }

  updateBook(data: any) {
    return this.firebase.collection('books').doc(data.id).update(data);
  }

  addVideo(data: any) {
    return this.firebase.collection('videos').add(data);
  }

  updateVideo(data: any) {
    return this.firebase.collection('videos').doc(data.id).update(data);
  }

  addInfographics(data: any) {
    return this.firebase.collection('infographics').add(data);
  }

  updateInfograpics(data: any) {
    return this.firebase.collection('infographics').doc(data.id).update(data);
  }

  addApproach(data: any) {
    return this.firebase.collection('approaches').doc(data.code).set(data);
  }

  addCategry(id: string, data: any) {
    return this.firebase.collection('approaches').doc(id).update(data);
  }
}
