import { Component, OnInit } from '@angular/core';
import { UnitsService } from 'src/app/admin/services/units/units.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  loader: boolean = true;
  isEmpty: boolean = false;
  language: any;
  status: any;
  approaches: any[] = [];
  approach: any;
  category: any;
  Videos: any[] = [];

  constructor(public units: UnitsService, private fires: FunctionsService) {
    this.getFiltersResults();
    this.units.approach$.subscribe((change) => {
      this.approaches = change;
    });
  }

  // for infinty scrolling and get data

  // rest details when eny event change
  clearLog() {
    this.Videos = [];
    this.loader = true;
    this.getFiltersResults();
  }

  // auto call function when any event change
  async getFiltersResults() {
    let { status, language, approach, category } = {
      status: this.status?.code,
      language: this.language?.code,
      approach: this.approach?.code,
      category: this.category?.map((e: any) => e.code),
    };
    this.fires
      .getFilters('videos', { status, language, approach, category })
      .subscribe((res: any) => {
        console.log(res);
        if (!res.length) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
        this.Videos = res;
        this.loader = false;
      });
  }

  ngOnInit(): void {}
}
