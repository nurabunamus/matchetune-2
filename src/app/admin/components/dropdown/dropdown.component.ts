import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormsfireService } from '../../services/forms/formsfire.service';
import { TabsadminService } from '../../services/Tabs/tabsadmin.service';
import { UnitsService } from '../../services/units/units.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  isDropdown: boolean = false;
  isDropdown2: boolean = false;
  addRow: boolean = false;
  addRow2: boolean = false;
  label: string = '';
  labelCat: string = '';
  showCategories: boolean = false;
  selectedCategory: any = { name: 'category', code: 'category' };
  approaches: any[] = [];
  indexSel: number = 0;
  @Output() approachCaty = new EventEmitter<any>();
  @Input() value: any = new EventEmitter<any>();

  constructor(
    public tab: TabsadminService,
    public units: UnitsService,
    public fires: FormsfireService,
    private messageService: MessageService
  ) {
    this.units.approach$.subscribe((res: any) => {
      this.approaches = res;
    });
  }

  ngOnInit(): void {
    let { category, approach } = this.value;
    if (category) {
      this.selectedCategory = category;
      console.log(category);
      this.showCategories = true;
      this.approaches.filter((e, i) => {
        if (e.code === approach.code) {
          this.indexSel = i;
        }
      });
    }
  }

  setDropdown() {
    this.isDropdown = !this.isDropdown;
    this.isDropdown2 = false;
  }

  setDropdown2() {
    this.isDropdown = false;
    this.isDropdown2 = !this.isDropdown2;
  }

  onChangeApproach(i: number) {
    this.indexSel = i;
    this.selectedCategory = { name: 'category', code: 'category' };
    this.isDropdown = !this.isDropdown;
    this.showCategories = true;
  }

  onChangeCategry(item: any) {
    this.isDropdown2 = false;
    this.selectedCategory = item;
    this.approachCaty.emit({
      approach: this.approaches[this.indexSel],
      category: this.selectedCategory,
    });
  }

  onAddApproach() {
    this.addRow = true;
  }
  onAddCategry() {
    this.addRow2 = true;
  }

  addCategry() {
    let name = this.labelCat
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    let code = this.labelCat.trim().toLowerCase().split(' ').join('_');
    this.labelCat = '';
    let { categories }: any = this.approaches[this.indexSel];
    let newArr = [...categories];
    newArr.push({ name, code });
    this.fires
      .addCategry(this.approaches[this.indexSel].code, {
        categories: newArr,
      })
      .then(() => {
        this.addRow = false;
        this.units.getApproaches().then((res) => {});
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `add a new one approach `,
        });
      });
  }
  addApproach() {
    let name = this.label
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    let code = this.label.trim().toLowerCase().split(' ').join('_');
    this.label = '';
    this.fires
      .addApproach({
        name,
        code,
        categories: [],
      })
      .then(() => {
        this.addRow = false;
        this.units.getApproaches();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `add a new one approach `,
        });
      });
  }
}
