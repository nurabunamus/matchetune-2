import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCardComponent implements OnInit {
  @Input() video: any;
  isSHow: boolean = false;

  constructor() {}
  toggleShow() {
    this.isSHow = !this.isSHow;
  }

  ngOnInit(): void {
    console.log(this.video);
  }
}
