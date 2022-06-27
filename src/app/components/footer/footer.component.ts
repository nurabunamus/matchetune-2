import { Component } from '@angular/core';
import { TranslaterService } from 'src/app/services/translate/translater.service';
import { MessageService } from 'primeng/api';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(
    private toggleTranslate: TranslaterService,
    private fires: FunctionsService,
    private messageService: MessageService
  ) {}

  valueLang: string =
    localStorage.getItem('matchetune-language-2022-06-22') || 'en';

  changeLang(lang: string) {
    this.toggleTranslate.changeLanguage(lang);
  }

  submitSub(form: any) {
    if (form.valid) {
      this.fires.addEmailSubscribe(form.value).then((res) => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'Email add to subscribtion',
        });
        form.reset();
      });
    }
  }
}
