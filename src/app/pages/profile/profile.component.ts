import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  onSnapshot,
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
  selectedInfo: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  isEmptyContent: boolean = false;

  constructor(
    public functions: FunctionsService,
    public chat: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const { id } = this.route.snapshot.params;
    this.selectedUserID = id;
    functions.isDataLogged$.subscribe((res) => {
      if (res.state && res.state !== 'success') {
        location.assign('/');
      }
      this.myInfo = res;
      if (res.id) {
        this.getContacts(res).then(() => {
          if (this.selectedUserID) {
            this.getContentChat();
          }
        });
      }
    });
  }

  selectUser(id: any, routGo: boolean) {
    if (routGo) {
      this.selectedUserID = id;
      this.router.navigate(['profile', id]);
      this.lines = [];
      this.getContentChat();
    }
    this.selectedInfo = this.usersChat.filter((e) => e.id === id)[0];
  }

  async getContacts(res: any) {
    if (res.type === 'healer') {
      let { contacts } = res;
      if (!contacts || !contacts.length) return;
      const q = query(
        collection(this.functions.store, 'patients'),
        where('id', 'in', contacts),
        limit(20)
      );
      let getData = await getDocs(q);
      console.log(getData.docs.length);
      let arr: any = [];
      getData.forEach((book) => {
        let doc = { id: book.id, ...book.data() };
        arr.push(doc);
      });
      this.usersChat = arr;
      this.selectUser(this.selectedUserID, false);
    } else {
      let { contacts } = res;
      if (!contacts || !contacts.length) return;
      const q = query(
        collection(this.functions.store, 'healers'),
        where('id', 'in', contacts),
        limit(20)
      );
      let getData = await getDocs(q);
      console.log(getData.docs.length);
      let arr: any = [];
      getData.forEach((book) => {
        let doc = { id: book.id, ...book.data() };
        arr.push(doc);
      });
      this.usersChat = arr;
      this.selectUser(this.selectedUserID, false);
    }
  }

  async getContentChat() {
    let myID = this.myInfo.id,
      otherID = this.selectedUserID;
    let { type: T1 } = this.myInfo; // sender
    let idDoc = T1 === 'healer' ? `${myID}_${otherID}` : `${otherID}_${myID}`;
    console.log(idDoc);
    const q = query(
      collection(this.functions.store, 'chats'),
      where('id', '==', idDoc),
      orderBy('sendAt'),
      limit(50)
    );
    onSnapshot(q, (querySnapshot) => {
      let arrContetn: any = [];
      querySnapshot.forEach((doc) => {
        arrContetn.push(doc.data());
      });
      this.lines = arrContetn;
      if (!arrContetn.length) {
        this.isEmptyContent = true;
      }
    });
  }

  ngOnInit() {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMsg() {
    if (!this.msg) return;
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
    this.msg = '';
    this.chat.createChat(data);
  }
}
