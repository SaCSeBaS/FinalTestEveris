import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  fsGetCategories(): Observable<Category[]> {
    const collection: AngularFirestoreCollection = this.db.collection(
      'categories'
    );

    return this._transformCollection(collection);
  }

  private _transformCollection(collection: AngularFirestoreCollection<DocumentData>) {
    return collection
      .snapshotChanges()
      .pipe(map((values) =>
          values.map((item) => this._categorySerializer(item.payload.doc))));
  }

  private _categorySerializer(document: QueryDocumentSnapshot<DocumentData>): Category {

    const data = document.data();

    return {
      uid: document.id,
      category_name: data.category_name
    };
  }

}
