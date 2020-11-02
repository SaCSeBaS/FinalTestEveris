import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  addNewOrder(uid: string, order: CartItem[]) {
    this.db.collection("users").doc(uid).collection("orders").add(Object.assign({}, order));
  }

}
