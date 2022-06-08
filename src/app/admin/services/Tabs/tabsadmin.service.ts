import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsadminService {
  private isTabSellect = new BehaviorSubject<string>('home');
  public currentTab$ = this.isTabSellect.asObservable();

  get Tab(): string {
    return this.isTabSellect.getValue();
  }

  private set Tab(val: string) {
    this.isTabSellect.next(val);
  }
  setCurrentTab(label: string) {
    this.Tab = label;
  }

  constructor() {}
}
