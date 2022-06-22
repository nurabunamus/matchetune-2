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
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import {SkeletonModule} from 'primeng/skeleton';

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
    CheckboxModule,
    CalendarModule,
    InputNumberModule,
    SkeletonModule,
  ],
})
export class MaterialModule {}
