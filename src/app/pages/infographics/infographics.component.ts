import { Component, OnInit } from '@angular/core';
import { UnitsService } from 'src/app/admin/services/units/units.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-infographics',
  templateUrl: './infographics.component.html',
  styleUrls: ['./infographics.component.css'],
})
export class InfographicsComponent implements OnInit {
  loader: boolean = true;
  isEmpty: boolean = false;
  approaches: any[] = [];
  language: any;
  status: any;
  approach: any;
  category: any;
  Infographics: any[] = [];
  constructor(public units: UnitsService, private fires: FunctionsService) {
    this.getFiltersResults();
    this.units.approach$.subscribe((change) => {
      this.approaches = change;
    });
  }

  // rest details when eny event change
  clearLog() {
    this.Infographics = [];
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
      .getFilters('infographics', { status, language, approach, category })
      .subscribe((res: any) => {
        console.log(res);
        if (!res.length) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
        this.Infographics = res;
        this.loader = false;
      });
  }
  ngOnInit(): void {}
}
