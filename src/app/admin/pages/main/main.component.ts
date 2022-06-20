import { Component } from '@angular/core';
import { UnitsService } from '../../services/units/units.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(public units: UnitsService) {
    this.units.checkIsAdmin();
  }

  login() {
    this.units.loginWithGoogle();
  }
}
