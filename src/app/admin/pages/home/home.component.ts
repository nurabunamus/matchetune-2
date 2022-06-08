import { Component, OnInit } from '@angular/core';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listAnalytics: any = [
    {
      title: 'Used Space',
      value: '49/50 GB',
      color: '#fd9e19',
      icon: 'pi pi-copy',
    },
    {
      title: 'Revenue',
      value: '$34,245',
      color: '#5eb462',
      icon: 'pi pi-credit-card',
    },
    {
      title: 'Fixed Issues',
      value: '75',
      color: '#ea4844',
      icon: 'pi pi-info-circle',
    },
    {
      title: 'Followers',
      value: '+245',
      color: '#1cbfd3',
      icon: 'pi pi-twitter',
    },
  ];
  constructor(public tab: TabsadminService) {
    this.tab.setCurrentTab('dashboard');
  }
  ngOnInit(): void {}
}
