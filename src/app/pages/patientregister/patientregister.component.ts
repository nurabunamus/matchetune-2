import { Component } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css'],
})
export class PatientregisterComponent {
  isLoadSign: boolean = false;
  isValid: boolean = false;
  showPass: boolean = false;
  checkAccount: boolean = false;
  display: boolean = false;

  constructor(private functions: FunctionsService, private router: Router) {}

  showDialog() {
    this.display = true;
  }

  firstRegister(form: any) {
    if (form.valid) {
      this.saveFirstStep(form.value);
    } else {
      this.isValid = true;
    }
  }

  async saveFirstStep(data: any) {
    this.isLoadSign = true;
    let check = await this.functions.addPatient(data);
    if (!check) {
      this.isLoadSign = false;
      this.checkAccount = true;
    } else {
      this.isLoadSign = true;
      this.checkAccount = false;
      this.router.navigate(['details']);
    }
  }

  showPassFun() {
    this.showPass = !this.showPass;
  }
}
