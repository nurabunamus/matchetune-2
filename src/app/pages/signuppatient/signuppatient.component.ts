import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signuppatient',
  templateUrl: './signuppatient.component.html',
  styleUrls: ['./signuppatient.component.css'],
})
export class SignuppatientComponent implements OnInit {
  listAdvanced: any[] = [
    'freemium.all_videos',
    'freemium.all_infographics',
    'freemium.all_books',
  ];

  listFree: any[] = [
    {
      title: 'freemium.basic_video',
      icon: true,
    },
    {
      title: 'freemium.basic_books',
      icon: true,
    },
    {
      title: 'freemium.basic_infographics',
      icon: true,
    },
    {
      title: 'line',
    },
    {
      title: 'freemium.advanced_videos',
      icon: false,
    },
    {
      title: 'freemium.advanced_books',
      icon: false,
    },
    {
      title: 'freemium.advanced_infograpgics',
      icon: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
