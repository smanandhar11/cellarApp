import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AddToFavsModel} from '../../models/allModel';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class UserInformation {
  items: Observable<any>;
  wishListItems: Observable<AddToFavsModel[]>;
  wishListed: AddToFavsModel;
  userId: string;
  cartRef: AngularFirestoreCollection<any>;
  wishListRef:  AngularFirestoreCollection<any>;
  wishSnap: Observable<any>;
  protected constructor(public db: AngularFireDatabase,
                        public afs: AngularFirestore,
                        private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  public isUser(): boolean {
    const authCondition = sessionStorage.getItem('auth');
    return authCondition === 'true';
  }

  addItemToCart(data) {
    this.cartRef = this.afs.collection(`users/${this.userId}/cart`);
    this.cartRef.add(data);
  }

  addItemToWishList(data) {
    this.wishListRef = this.afs.collection(`users/${this.userId}/wishlist`);
    this.wishListRef.add(data);
  }

  getWishList() {
    this.wishListItems = this.afs.collection(`users/${this.userId}/wishlist`).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as AddToFavsModel;
        data.id = a.payload.doc.id;
        this.wishListed = data;
        console.log('from service', this.wishListed);
        return data;
      });
    }));
  }

  getCart() {
    // this.items = this.db.list(`users/${this.userId}/cart`).valueChanges();
    // return this.items;
  }
  // removeWishItem(itemKey: string) {
  //   this.wishListRef = this.db.list(`users/${this.userId}/wishlist`);
  //   this.wishListRef.remove(itemKey);
  // }
}
