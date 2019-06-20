export interface ProductInputModel {
  id?: string;
  type: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrlTwo?: string;
  imageUrlThree?: string;
  imageUrlFour?: string;
  primeColor: string;
  uid?: string;
}

export interface ProductTypes {
  value: string;
  viewValue: string;
}

export interface AdminCredModel {
  username: string;
  password: string;
}

export interface UserInfo {
  uid: string;
  email: string;
}

export interface AddToFavsModel {
  uid: string;
  length: number;
  id?: string;
}

