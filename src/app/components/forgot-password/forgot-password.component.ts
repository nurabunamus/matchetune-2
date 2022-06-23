import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';

  constructor(private auth: FunctionsService,    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async onSubmit(form: any) {
    if (form.valid) {
      this.email = form.value.email;
      this.auth.forgotPassword(this.email);
      this.email = '';
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Enter all required informations!',
      });
    }
  }


}
