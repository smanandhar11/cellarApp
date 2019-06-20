import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AddToFavsModel, ProductInputModel} from '../models/allModel';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  cartColl: AngularFirestoreCollection<AddToFavsModel>;
  wishListColl: AngularFirestoreCollection<AddToFavsModel>;
  getWish: Observable<any>;
  userId: string;
  items: Observable<AddToFavsModel[]>;
  constructor(public db: AngularFireDatabase,
              public afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.cartColl = this.afs.collection(`users/${this.userId}/cart`);
        // this.wishListColl = this.afs.collection(`users/${this.userId}/wishlist`);
      }
    });
  }

  public isUser(): boolean {
    const authCondition = sessionStorage.getItem('auth');
    return authCondition === 'true';
  }

  addItemToCart(data: AddToFavsModel) {
    this.cartColl.add(data);
  }

  addItemToWishList(data: AddToFavsModel) {
    this.wishListColl.add(data);
  }

  getWishList() {

    this.items = this.afs.collection('users').valueChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel;
        // data.id = a.payload.doc.id;
        // this.prodItems = data;
        return data;
      });
    }));
  }
}
