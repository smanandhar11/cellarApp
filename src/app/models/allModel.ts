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
  uid: number;
  primeColor: string;
}

export interface ProductTypes {
  value: string;
  viewValue: string;
}

export interface ItemInfoModel {
  title: string;
  uid: number;
}