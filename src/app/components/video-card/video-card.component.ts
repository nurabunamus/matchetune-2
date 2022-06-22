import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCardComponent implements OnInit {
  @Input() video: any;
  isSHow: boolean = false;
  display: boolean = false;
  isAccess: boolean = false;

  showDialog() {
    this.display = true;
  }

  constructor(public functions: FunctionsService, private route: Router) {
    functions.isDataLogged$.subscribe((res: any) => {
      if (res.state === 'success') {
        this.isAccess = true;
      } else {
        this.isAccess = false;
      }
    });
  }
  toggleShow() {
    this.isSHow = !this.isSHow;
  }

  ngOnInit(): void {
    console.log(this.video);
  }
}
