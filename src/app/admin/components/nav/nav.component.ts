import { Component, OnInit } from '@angular/core';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';
import { UnitsService } from '../../services/units/units.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  menu: any = [
    {
      label: 'dashboard',
      icon: 'pi pi-home',
    },

    {
      label: 'users',
      icon: 'pi pi-user',
    },
    {
      label: 'healers',
      icon: 'pi pi-user-plus',
    },
    {
      label: 'books',
      icon: 'pi pi-book',
    },

    {
      label: 'videos',
      icon: 'pi pi-video',
    },

    {
      label: 'infographics',
      icon: 'pi pi-image',
    },

    {
      label: 'subscribers',
      icon: 'pi pi-heart',
    },
  ];

  constructor(public tab: TabsadminService, public units: UnitsService) {}
  ngOnInit(): void {}
}
