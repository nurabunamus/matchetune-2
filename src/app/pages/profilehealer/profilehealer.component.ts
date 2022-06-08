import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-profilehealer',
  templateUrl: './profilehealer.component.html',
  styleUrls: ['./profilehealer.component.css'],
})
export class ProfilehealerComponent implements OnInit {
  data: any;
  constructor(
    public functions: FunctionsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.getDocFires(id);
  }

  async getDocFires(id: string) {
    console.log(id);
    try {
      const userDoc = doc(this.functions.store, 'healers', id);
      const docSnap = await getDoc(userDoc).then((res) => {
        console.log(res.data());
        this.data = res.data();
      });
    } catch {}
  }
}
