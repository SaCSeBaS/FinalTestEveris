import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  fsAddUser(user: User): void {
    this.db.collection('users').doc(user.uid).set(Object.assign({}, user));
  }

  fsGetUser(uid: string): Observable<User> {
    const document: AngularFirestoreDocument = this.db
      .collection('users')
      .doc(uid);

    return document
      .snapshotChanges()
      .pipe(
        map((value) =>
          value.payload.exists ? this._userSerializer(value.payload) : null
        )
      );
  }

  private _userSerializer(document: QueryDocumentSnapshot<DocumentData>): User {
    return {
      uid: document.id,
      name: document.data().name,
    };
  }

}
