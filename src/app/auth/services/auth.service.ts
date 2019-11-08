import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';

import { User } from './model/user.model'; // optional
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userData: any; // Save logged in user data

  // start with no user
  authState: any = null;

  public get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // logged out, null
          return of(null);
        }
      })
    );
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.afAuth.authState.subscribe(data => (this.authState = data));

    // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // logged out, null
          return of(null);
        }
      })
    );


  }

  public get isAuthenticated(): boolean {
    return !!this.afAuth.authState;
  }
  // @angular/fire provides an authState Observable which is great for reacting to
  // realtime changes to the user’s login state. However, it can be useful to also
  // return this value as a Promise for one-off operations and for use with async/await.
  // Let’s say we have an auth service using Firebase. We can take the first() emitted value
  // from the stream, then convert it using toPromise()
  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // Email/Password Auth Sign Up

  register(email: string, password: string, fullName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (result) => {
          // Update the profile in firebase auth
          result.user.updateProfile({
            displayName: fullName,
            photoURL: '',
          });
          // Create the user in firestore
          this.afs.firestore.collection('users').doc(result.user.uid).set(
            {
              uid: result.user.uid,
              email: result.user.email,
              displayName: fullName,
              photoURL: result.user.photoURL,
            },
          );
      });
    }


  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }


  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['/layouts']);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userRole = (user.email === 'katakugermain@gmail.com') ? 'admin' : 'user';
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: userRole,
      isActive: true,
      isDeleted: false,
      updateDate: new Date()
    };

    return userRef.set(data, { merge: true });

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/auth/login']);
  }

  // If error, console log and notify user
  /* istanbul ignore next */
  private handleError(error: firebase.auth.Error) {
    // console.error(error);
    // this.notify.update(error.message, 'error');
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/email-already-in-use') {
      console.error('There already exists an account with the given email address.');
    } else if (errorCode === 'auth/invalid-email') {
      console.error('The email address is not valid.');
    } else if (errorCode === 'auth/operation-not-allowed') {
      console.error('The email/password accounts are not enabled.');
    } else if (errorCode === 'auth/weak-password') {
      console.error('The password is not strong enough.');
    } else {
      console.error(errorMessage);
    }
    console.log(error);
  }
}
