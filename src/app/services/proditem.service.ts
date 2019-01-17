import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductInputModel, ItemInfoModel } from '../models/allModel';

@Injectable({
  providedIn: 'root'
})
export class ProditemService {
  itemsCollection: AngularFirestoreCollection<ProductInputModel>;
  itemInfoCollection: AngularFirestoreCollection<ItemInfoModel>;
  items: Observable<ProductInputModel[]>;
  prodItems;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items');
    this.itemInfoCollection = this.afs.collection('itemInfo');
  }
  getItems() {
    this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ProductInputModel[];
        data.id = a.payload.doc.id;
        this.prodItems = data;
        return data;
      });
    }));
  }
  addItem(item: ProductInputModel) {
    this.itemsCollection.add(item);
  }
  updateLatestUid(field: ItemInfoModel) {
    this.itemInfoCollection.add(field);
  }
}