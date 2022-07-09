import { Component, OnInit } from '@angular/core';
import { FormsfireService } from '../../services/forms/formsfire.service';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listAnalytics: any = {};
  constructor(public tab: TabsadminService, private forms: FormsfireService) {
    this.tab.setCurrentTab('dashboard');
    this.forms.getAdminMain().subscribe((data) => {
      this.listAnalytics = data;
      console.log(data);
    });
  }
  ngOnInit(): void {}
}
