import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenService } from 'src/app/services/auth/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPass: boolean = false;
  constructor(
    private authen: AuthenService,
    private auth: AngularFireAuth,
    private route: Router,
    private messageService: MessageService
  ) {}

  isValid: boolean = false;
  ngOnInit(): void {}

  async onSubmit(form: any) {
    if (form.valid) {
      let { email, password } = form.value;
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }: any) => {
          const { uid } = user;
          console.log(user.uid);
          this.route.navigate(['/']).then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'email or password error',
          });
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
  withFacebook() {
    console.log('withFacebook');
    this.authen.loginWithFacebook();
  }
  withGoogle() {
    console.log('withGoogle');
    this.authen.loginWithGoogle();
  }
}
