import { Component, OnInit } from '@angular/core';
import {ProductInputModel, ProductTypes} from '../../models/allModel';
import { ProditemService } from '../../services/proditem.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proddisplay',
  templateUrl: './proddisplay.component.html',
  styleUrls: ['./proddisplay.component.scss']
})
export class ProddisplayComponent implements OnInit {
  proditemData: ProductInputModel[];
  filterType: string;
  filterPrice: string;
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
  constructor(private prodItemService: ProditemService,
              private router: Router) { }

  ngOnInit() {
    this.prodItemService.getItems();
    this.prodItemService.items.subscribe(data => {
      this.proditemData = data;
    });
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
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }

}
