export interface DropDown {
  name: string;
  code: string;
}

export interface Subscribers {
  id: string;
  email: string;
}

export interface Approaches {
  categories: category;
  code: string;
  name: string;
}

export interface category {
  code: string;
  name: string;
}
