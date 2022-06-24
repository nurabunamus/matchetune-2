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
  logData: any;
  isOpen: boolean = false;

  constructor(public functions: FunctionsService, private route: Router) {
    functions.isDataLogged$.subscribe((res: any) => {
      this.logData = res;
      if (res.type) {
        if (res.type === 'healer') {
          this.listMenu = this.listMenu.filter(
            // (e) => e.path !== 'login' || e.path !== 'healers'
            (e) => !['login', 'healers'].includes(e.path)
          );
        } else {
          this.listMenu = this.listMenu.filter((e) => e.path !== 'login');
        }
      }
    });
    functions.isDataLogged$.subscribe((res) => {
      if (Object.keys(res).length) {
        this.data = res;
      }
    });
  }

  routerToggle(path: string) {
    if (
      path === 'profile' &&
      this.logData.state !== 'success' &&
      this.logData.type !== 'healer'
    ) {
      this.togglePop();
      if (this.logData.state === 'second_info') {
        this.route.navigate([`/details`]);
      } else if (this.logData.state === 'checkout') {
        this.route.navigate([`/checkout`]);
      }
    } else {
      this.togglePop();
      this.route.navigate([`/${path}`]);
    }
  }

  togglePop() {
    this.openPopUser = !this.openPopUser;
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
