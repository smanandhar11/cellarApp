import { Component, OnInit } from '@angular/core';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
import { ProditemService } from '../../services/proditem.service';

@Component({
  selector: 'app-proddisplay',
  templateUrl: './proddisplay.component.html',
  styleUrls: ['./proddisplay.component.scss']
})
export class ProddisplayComponent implements OnInit {
  proditemData: ProductInputModel[];
  filterType: string;
  filterPrice: string;
  filterColor: string;
  prodUsers: prodUserModel[];
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  prodPrices: ProductTypes[] = [
    {value: 'lessThan100', viewValue: 'Less Than Rs.100'},
    {value: '100-500', viewValue: 'Rs.100 - Rs.500'},
    {value: '500-1000', viewValue: 'Rs.500 - Rs1000'},
    {value: 'MoreThan1000', viewValue: 'More Than Rs.1000'}
  ];
  prodColors: ProductTypes[] = [
    {value: 'gold', viewValue: 'Gold'},
    {value: 'silver', viewValue: 'Silver'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'pink', viewValue: 'Pink'}
  ];
  constructor(private prodItemService: ProditemService) { }

  ngOnInit() {
    this.prodItemService.getItems();
    this.prodItemService.items.subscribe(data => {
      this.proditemData = data;
      console.log('prod', this.proditemData);
    });

    this.prodItemService.getUsers();
    this.prodItemService.userItems$.subscribe(data => {
      this.prodUsers = data;
      console.log(this.prodUsers);
    })
  }

  clearFilterType(e) {
    const elementName = e.target.previousElementSibling.lastElementChild
                         .firstElementChild.firstElementChild.firstElementChild
                         .getAttribute('name');
    if (elementName === 'type') {
      this.filterType = '';
    }
    if (elementName === 'price') {
      this.filterPrice = '';
    }
    if (elementName === 'color') {
      this.filterColor = '';
    }
  }



}
export interface prodUserModel {
  name: string;
  title: string;
}
