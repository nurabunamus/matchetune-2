import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    AccordionModule,
    TagModule,
    ImageModule,
    MultiSelectModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    DialogModule,
    CheckboxModule
  ],
})
export class MaterialModule {}
