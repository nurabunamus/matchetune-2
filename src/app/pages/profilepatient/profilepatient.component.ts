import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-profilepatient',
  templateUrl: './profilepatient.component.html',
  styleUrls: ['./profilepatient.component.css'],
})
export class ProfilepatientComponent implements OnInit {
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
    try {
      const userDoc = doc(this.functions.store, 'patients', id);
      const docSnap = await getDoc(userDoc).then((res) => {
        this.data = res.data();
      });
    } catch {}
  }
}
