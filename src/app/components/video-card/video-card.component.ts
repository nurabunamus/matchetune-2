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
    console.log('showDialog');
    this.display = true;
  }

  constructor(public functions: FunctionsService, private route: Router) {}
  toggleShow() {
    this.isSHow = !this.isSHow;
    console.log('toggleShow');
  }

  ngOnInit(): void {
    // console.log(this.video);
    if (this.video) {
      this.functions.isDataLogged$.subscribe((res: any) => {
        if (res.state === 'success' || this.video?.status?.code === 'free') {
          this.isAccess = true;
        } else {
          this.isAccess = false;
        }
      });
    }
  }
}
