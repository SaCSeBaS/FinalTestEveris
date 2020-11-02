import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  signOut(): void {
    this.afAuth.signOut();
  }

  facebookLogin = () =>
    new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

  googleLogin = () =>
    new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

  emailLogin = (user: any) => this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  
  signUp = (user: any) => this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  
}