import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  fsGetProducts(): Observable<Product[]> {
    const collection: AngularFirestoreCollection = this.db.collection(
      'products'
    );

    return this._transformCollection(collection);
  }

  fsGetProductsByCategory(category_id: string): Observable<Product[]> {
    const collection = this.db.collection('products', ref => ref.where("category_id", "==", category_id));

    return this._transformCollection(collection);
  }

  private _transformCollection(collection: AngularFirestoreCollection<DocumentData>) {
    return collection
      .snapshotChanges()
      .pipe(map((values) =>
          values.map((item) => this._productSerializer(item.payload.doc))));
  }

  private _productSerializer(document: QueryDocumentSnapshot<DocumentData>): Product {

    const data = document.data();

    return {
      uid: document.id,
      brand: data.brand,
      category_id: data.category_id,
      model: data.model,
      name: data.name,
      price: data.price,
      url: data.url
    };
  }
  
}
