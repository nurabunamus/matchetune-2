import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsadminService {
  // to check if the current tab is selected
  private isTabSellect = new BehaviorSubject<string>('home');
  public currentTab$ = this.isTabSellect.asObservable();

  get Tab(): string {
    return this.isTabSellect.getValue();
  }

  private set Tab(val: string) {
    this.isTabSellect.next(val);
  }

  // to set the current tab
  setCurrentTab(label: string) {
    this.Tab = label;
  }
}
