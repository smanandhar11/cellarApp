import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AddToFavsModel, ProductInputModel} from '../models/allModel';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProditemService {
  itemsCollection: AngularFirestoreCollection<ProductInputModel>;
  items: Observable<ProductInputModel[]>;
  prodItems;
  userId: string;
  usersCollectionz: AngularFirestoreCollection<ProductInputModel>;
  userItems$: Observable<ProductInputModel[]>;
  userItemz;
  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.itemsCollection = this.afs.collection('items');
    this.usersCollection = this.afs.collection('users');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  getItems() {
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel;
        data.id = a.payload.doc.id;
        this.prodItems = data;
        return data;
      });
    }));
  }
  addItem(item: ProductInputModel) {
    this.itemsCollection.add(item);
  }

  getUsers() {
    this.userItems$ = this.afs.collection(`users/${this.userId}/cart`).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as AddToFavsModel;
        data.id = a.payload.doc.id;
        this.userItemz = data;
        return data;
      });
    }));
  }

  addToCart(item: AddToFavsModel) {
    this.usersCollectionz = this.afs.collection(`users/${this.userId}/cart`);
    this.usersCollectionz.add(item);
  }
}
