import { Component, HostListener, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { FunctionsService } from './services/functions/functions.service';
import { TranslaterService } from './services/translate/translater.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  innerWidth: number = 0;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private trLang: TranslaterService,
    private functions: FunctionsService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = event.url.split('/')[1] === 'admin';
      }
    });
    this.functions.checkAuthentication();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
}
