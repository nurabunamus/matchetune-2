import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input() innerWidth: number = 0;
  data: any;
  openPopUser: boolean = false;
  listMenu = [
    { title: 'nav.sign_in', path: 'login' },
    // {  title: 'nav.alternatives', path: 'alternatives' },
    { title: 'nav.infographics', path: 'infographics' },
    { title: 'nav.books', path: 'books' },
    { title: 'nav.videos', path: 'videos' },
    { title: 'nav.healers', path: 'healers' },
    { title: 'nav.about', path: 'about' },
  ];

  isOpen: boolean = false;

  constructor(public functions: FunctionsService, private route: Router) {
    functions.isLogged$.subscribe((res) => {
      if (res) {
        this.listMenu = this.listMenu.filter((e) => e.path !== 'login');
      }
    });
    functions.isDataLogged$.subscribe((res) => {
      if (Object.keys(res).length) {
        this.data = res;
      }
    });
  }

  routerToggle(path: string) {
    this.togglePop();
    this.route.navigate([`/${path}`]);
  }

  togglePop() {
    this.openPopUser = !this.openPopUser;
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
