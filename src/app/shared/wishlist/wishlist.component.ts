import {Component, OnInit} from '@angular/core';
import {AddToFavsModel, ProductInputModel} from '../../models/allModel';
import {ProditemService} from '../../services/proditem.service';
import _ from 'lodash';
import {UserInformation} from '../../comp/abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserDataService} from '../../services/user-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent extends UserInformation implements OnInit {
  proditemData: ProductInputModel[];
  userWishList: AddToFavsModel[] = [];
  userWishVal: AddToFavsModel[] = [];
  result = [];
  itemKey: string;
  constructor(private prodItemService: ProditemService,
              private userDataService: UserDataService,
              db: AngularFireDatabase,
              afAuth: AngularFireAuth,
              afs: AngularFirestore,
              private router: Router) {
    super(db, afs, afAuth);
  }

  ngOnInit() {
    this.getProdItems();
    this.getUserWishList();
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }

  getProdItems() {
    // call to get item from server
    this.prodItemService.getItems();
    // after subscribing to item from server
    this.prodItemService.items.subscribe(data => {
      // set data to component
      this.proditemData = data;
    });
  }
  getUserWishList() {
    this.userDataService.getWishList();
    this.userDataService.items.subscribe(data => {
      // console.log('here',data);
    });
  }
  notifyWishList(id: string) {
    // getting the key
    // for (let g = 0; g < this.userWishList.length; g++) {
    //   if (id === this.userWishList[g].payload.val().uid) {
    //     this.itemKey = this.userWishList[g].key;
    //     // this.removeWishItem(this.itemKey);
    //   }
    // }
  }
}
