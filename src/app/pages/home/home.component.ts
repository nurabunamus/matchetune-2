import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hide: boolean = !false;
  display1: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  Books: any[] = [];

  showDialog1() {
    this.display1 = true;
  }
  showDialog2() {
    this.display2 = true;
  }
  showDialog3() {
    this.display3 = true;
  }
  showDialog4() {
    this.display4 = true;
  }
  cardsDescover: any[] = [
    '/assets/covers/Screenshot 2022-04-12 131630.png',
    '/assets/covers/Screenshot 2022-04-12 131634.png',
    '/assets/covers/Screenshot 2022-04-12 131630.png',
    '/assets/covers/Screenshot 2022-04-12 131634.png',
    '/assets/covers/Screenshot 2022-04-12 131630.png',
    '/assets/covers/Screenshot 2022-04-12 131634.png',
  ];
  cardsTesti: any[] = [
    {
      cover: '/assets/covers/avatar_1.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      name: 'Albert Scops',
      position: 'Product designer at moq',
    },
    {
      cover: '/assets/covers/avatar_2.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      name: 'Albert Scops',
      position: 'Product designer at moq',
    },
    {
      cover: '/assets/covers/avatar_3.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      name: 'Albert Scops',
      position: 'Product designer at moq',
    },
    {
      cover: '/assets/covers/avatar_4.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      name: 'Albert Scops',
      position: 'Product designer at moq',
    },
  ];
  freqOpen: number | undefined;
  frequently: any[] = [
    {
      id: 0,
      title: 'What is an alternative medicine?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    },
    {
      id: 1,
      title: 'What is an alternative medicine?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    },
    {
      id: 2,
      title: 'What is an alternative medicine?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    },
  ];
  numbers: number[] = Array(70);
  isLogged: boolean = false;

  constructor(public functions: FunctionsService) {
    functions.isLogged$.subscribe((res) => {
      if (res) {
        this.isLogged = res;
      }
    });
  }

  setFreqOpen(id: number) {
    this.freqOpen = this.freqOpen === id ? undefined : id;
  }

  ngOnInit(): void {}
}
