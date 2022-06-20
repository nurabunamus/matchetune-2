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
  constructor(private functions: FunctionsService, private router: Router) {}

  firstRegister(form: any) {
    if (form.valid) {
      this.saveFirstStep(form.value);
    } else {
      this.isValid = true;
    }
  }

  async saveFirstStep(data: any) {
    this.isLoadSign = true;
    try {
      let check = await this.functions.addPatient(data);
      if (!check) {
        return alert('your account is exists');
      }
      this.router.navigate(['details']);
    } catch {
      return alert('cant create aaccount');
    }
  }

  showPassFun() {
    this.showPass = !this.showPass;
  }
}
