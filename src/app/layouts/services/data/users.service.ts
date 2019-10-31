import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn
} from '@angular/fire/firestore';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { users } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly path = 'users';
  private collection: AngularFirestoreCollection<users>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<users>(this.path);
   }

   private getCollection(collection: string) {
    this.collection = this.afs.collection<users>(collection);
  }

   add(collection: string, data: users) {
    this.getCollection(collection);
    return this.afs.doc<users>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<users>(`${this.path}/${id}`).delete();
  }

  update(data: users) {
    return this.afs.doc<users>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  getCollection$(ref?: QueryFn): Observable<users[]> {
    return this.afs.collection<users>(this.path, ref)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as users;
          const id = data.id;
          return { id, ...data };
        });
      })
      );
  }

}
