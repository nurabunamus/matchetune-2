import { Component, Input } from '@angular/core';
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
    { title: 'nav.infographics', path: 'infographics' },
    { title: 'nav.books', path: 'books' },
    { title: 'nav.videos', path: 'videos' },
    { title: 'nav.healers', path: 'healers' },
  ];
  isOpen: boolean = false;

  constructor(public functions: FunctionsService, private route: Router) {
    functions.isDataLogged$.subscribe((res: any) => {
      if (res.type) {
        if (res.type === 'healer') {
          this.listMenu = [];
        } else {
          this.listMenu = [
            { title: 'nav.infographics', path: 'infographics' },
            { title: 'nav.books', path: 'books' },
            { title: 'nav.videos', path: 'videos' },
            { title: 'nav.healers', path: 'healers' },
          ];
        }
      }
    });
    functions.isDataLogged$.subscribe((res) => {
      if (Object.keys(res).length) {
        this.data = res;
      }
    });
  }

  routerToggle() {
    this.toggleMenu();
    if (this.data.type === 'healer') {
      this.route.navigate([`/chat`]);
    } else if (this.data.state === 'success' && this.data.type === 'patient') {
      this.route.navigate([`/chat`]);
    } else {
      this.functions.checkAccess();
    }
  }

  goProfile() {
    this.togglePop();
    this.route.navigate([`/profile`]);
  }

  togglePop() {
    this.openPopUser = !this.openPopUser;
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  routSIgnupMode() {
    this.toggleMenu();
    this.functions.togglePopSignup();
  }
}
