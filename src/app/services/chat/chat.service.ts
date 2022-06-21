import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, getFirestore, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firebase: AngularFirestore) {}

  async createChat(data: any) {
    return this.firebase.collection('chats').add(data);
  }








}
