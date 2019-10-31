import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { users } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class DocteurService {

  readonly path = 'users';
  private collection: AngularFirestoreCollection<users>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<users>(this.path);
   }

  add(data: users) {
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
