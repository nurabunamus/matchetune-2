import { Component, Input, OnInit, Output } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-poptypesignup',
  templateUrl: './poptypesignup.component.html',
  styleUrls: ['./poptypesignup.component.css'],
})
export class PoptypesignupComponent {
  @Output() popShowSugn: boolean = false;
  constructor(private hooks: FunctionsService) {}
  closepop() {
    this.hooks.togglePopSignup();
  }
}
