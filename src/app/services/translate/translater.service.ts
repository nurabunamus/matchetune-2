import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslaterService {
  constructor(private translater: TranslateService) {
    let userLang = navigator.language || navigator.userAgent;
    let fromLangStore = localStorage.getItem('matchetune-language-2022-06-22');
    let checkIs = fromLangStore || userLang;
    if (checkIs === 'sp') this.translater.use('sp');
    else this.translater.use('en');
  }

  changeLanguage(lang: string) {
    this.translater.use(lang);
    localStorage.setItem('matchetune-language-2022-06-22', lang);
  }
}
