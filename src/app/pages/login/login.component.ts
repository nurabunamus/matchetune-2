import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPass: boolean = false;
  constructor(
    private route: Router,
    private functions: FunctionsService,
    private messageService: MessageService
  ) {}

  async onSubmit(form: any) {
    if (form.valid) {
      let { email, password } = form.value;
      this.functions.checkLogin(email, password).then((res) => {
        if (res) {
          this.route.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'email or password error',
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'enter inputs',
      });
    }
  }
  showPassFun() {
    this.showPass = !this.showPass;
  }
}
