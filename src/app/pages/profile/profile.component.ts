import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  usersChat: any[] = [];
  selectedUserID: string = '';
  content: any[] = [];
  myInfo: any;
  msg: string;
  lines: any[] = [];

  constructor(
    public functions: FunctionsService,
    public chat: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const { id } = this.route.snapshot.params;
    this.selectedUserID = id;
    functions.isDataLogged$.subscribe((res) => {
      this.myInfo = res;
      if (res.id) {
        this.getContacts(res).then(() => {
          this.getContentChat(res.id);
        });
      }
    });
  }

  selectUser(id: any) {
    this.router.navigate(['profile', id]);
    console.log('selectedUserID: ', this.selectedUserID);
    this.selectedUserID = id;
    this.getContentChat(id);
  }

  async getContentChat(id: string) {
    console.log('i am : ', id, ' with : ', this.selectedUserID);
    let myID = this.myInfo.id,
      otherID = this.selectedUserID;
    let otherUser: any = this.usersChat.filter((i) => i.id === otherID);
    let { type: T1, id: ID1 } = this.myInfo; // sender
    let { type: T2, id: ID2 } = otherUser[0]; // resceiver
    let idDoc = T1 === 'healer' ? `${myID}_${otherID}` : `${otherID}_${myID}`;
    console.log(idDoc);

    let refColl = collection(this.functions.store, 'chats');
    let q = query(refColl, orderBy('sendAt'), where('id', '==', idDoc));
    let getData = await getDocs(q);

    let arrContetn: any = [];
    getData.forEach((item) => {
      arrContetn.push({ ...item.data(), id: item.id });
    });
    this.lines = arrContetn;
  }

  async getContacts(res: any) {
    console.log(res.type);
    console.log(res.type);
    if (res.type === 'healer') {
      let getData = await getDocs(collection(this.functions.store, 'patients'));
      let arr: any = [];
      getData.forEach((item) => {
        arr.push({ ...item.data(), id: item.id });
      });
      this.usersChat = arr;
    } else {
      let getData = await getDocs(collection(this.functions.store, 'healers'));
      let arr: any = [];
      getData.forEach((item) => {
        arr.push({ ...item.data(), id: item.id });
      });
      this.usersChat = arr;
    }
  }

  sendMsg() {
    let myID = this.myInfo.id,
      otherID = this.selectedUserID;
    let otherUser: any = this.usersChat.filter((i) => i.id === otherID);
    let { type: T1, id: ID1 } = this.myInfo; // sender
    let { type: T2, id: ID2 } = otherUser[0]; // resceiver
    let id = T1 === 'healer' ? `${myID}_${otherID}` : `${otherID}_${myID}`;

    let data = {
      id,
      sendAt: Date.now(),
      msg: { type: 'text', value: this.msg },
      sender: { type: T1, id: ID1 },
      sereceivernder: { type: T2, id: ID2 },
    };

    console.log(' ======= = = == ');
    console.log(data);

    this.msg = '';
    this.chat.createChat(data);
  }

  ngOnInit(): void {}
}
