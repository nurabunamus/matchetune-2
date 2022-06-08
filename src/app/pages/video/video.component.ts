import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  video: any;
  constructor(
    private route: ActivatedRoute,
    private functions: FunctionsService
  ) {
    let id = this.route.snapshot.paramMap.get('id') || '';
    console.log(id);
    if (id) {
      this.getDocBook(id);
    }
  }

  async getDocBook(id: string) {
    console.log(id);
    try {
      const userDoc = doc(this.functions.store, 'videos', id);
      await getDoc(userDoc).then((res) => {
        console.log(res.data());
        this.video = res.data();
      });
    } catch {}
  }
  ngOnInit(): void {}
}
