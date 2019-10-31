import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Statut } from '../models/statut';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  readonly path = 'Statut';
  private collection: AngularFirestoreCollection<Statut>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Statut>(this.path);
   }

  add(data: Statut) {
    return this.afs.doc<Statut>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<Statut>(`${this.path}/${id}`).delete();
  }

  update(data: Statut) {
    return this.afs.doc<Statut>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  getCollection$(ref?: QueryFn): Observable<Statut[]> {
    return this.afs.collection<Statut>(this.path, ref)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Statut;
          const id = data.id;
          return { id, ...data };
        });
      })
      );
  }

}
