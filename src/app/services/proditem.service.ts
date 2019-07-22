import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductInputModel } from '../models/allModel';

@Injectable({
  providedIn: 'root'
})
export class ProditemService {
  itemsCollection: AngularFirestoreCollection<ProductInputModel>;
  items: Observable<ProductInputModel[]>;
  prodItems;

  usersCollection: AngularFirestoreCollection<ProductInputModel>;
  userItems$: Observable<ProductInputModel[]>;
  userItemz;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items');
    this.usersCollection = this.afs.collection('users');
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
    this.userItems$ = this.afs.collection('users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel;
        data.id = a.payload.doc.id;
        this.userItemz = data;
        return data;
      });
    }));
  }
}
