import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslaterService {
  constructor(private translater: TranslateService) {
    let userLang = navigator.language || navigator.userAgent;
    if (userLang === 'sp') this.translater.use('sp');
    else this.translater.use('en');
    // add to localstorage
  }

  changeLanguage(lang: string) {
    this.translater.use(lang);
  }
}
