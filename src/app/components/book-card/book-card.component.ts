import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book: any;
  isAccess: boolean = false;
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  routeBook() {
    if (this.isAccess && this.book.status.code === 'paid') {
      this.route.navigate(['/book', this.book.id]);
    } else if (!this.isAccess && this.book.status.code === 'paid') {
      this.showDialog();
    } else if (this.book.status.code === 'free') {
      this.route.navigate(['/book', this.book.id]);
    }
  }

  constructor(public functions: FunctionsService, private route: Router) {
    functions.checkRoute$.subscribe((res: any) => {
      if (res === true) {
        this.isAccess = true;
      } else {
        this.isAccess = false;
      }
    });
  }
}
