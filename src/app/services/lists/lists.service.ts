import { Injectable } from '@angular/core';
import { DropDown } from 'src/app/admin/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor() {}

  approach: DropDown[] = [
    { name: 'All', code: 'all' },
    { name: 'Integrative', code: 'integrative' },
    { name: 'Ancestral', code: 'ancestral' },
    { name: 'Chinese', code: 'chinese' },
    { name: 'Western Holistic', code: 'western_holistic' },
  ];
  categories: any = {
    integrative: [
      { name: 'Astrological Chart', code: 'astrological_chart' },
      { name: 'Reiki', code: 'Reiki' },
      { name: 'Pineal Glandule', code: 'pineal_glandule' },
      { name: 'Numerology', code: 'numerology' },
      { name: 'Floral Therapy', code: 'floral_therapy' },
    ],
    ancestral: [
      { name: 'Mapuche', code: 'mapuche' },
      { name: 'Quero', code: 'quero' },
      { name: 'Aymara', code: 'aymara' },
      { name: 'Lykanan Antai', code: 'lykanan_antai' },
    ],
    chinese: [
      { name: 'Acupuncture', code: 'acupuncture' },
      { name: 'Massages', code: 'massages' },
      { name: 'Moxibustion', code: 'moxibustion' },
      { name: 'Herbs', code: 'herbs' },
    ],
    western_holistic: [
      { name: 'Doctors', code: 'doctors' },
      { name: 'Gynecologists', code: 'gynecologists' },
      { name: 'Pediatrics', code: 'pediatrics' },
      { name: 'Psicologists', code: 'psicologists' },
      { name: 'Psiquiatrics', code: 'psiquiatrics' },
    ],
  };

  languages: DropDown[] = [
    { name: 'All', code: 'all' },
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'sp' },
  ];
  
  status: DropDown[] = [
    { name: 'All', code: 'all' },
    { name: 'Free', code: 'free' },
    { name: 'Paid', code: 'paid' },
  ];
}
