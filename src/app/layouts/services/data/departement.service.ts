import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Departement } from '../models/departement';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  readonly path = 'Departement';
  private collection: AngularFirestoreCollection<Departement>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Departement>(this.path);
   }

  add(data: Departement) {
    return this.afs.doc<Departement>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<Departement>(`${this.path}/${id}`).delete();
  }

  update(data: Departement) {
    return this.afs.doc<Departement>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  getCollection$(ref?: QueryFn): Observable<Departement[]> {
    return this.afs.collection<Departement>(this.path, ref)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Departement;
          const id = data.id;
          return { id, ...data };
        });
      })
      );
  }

}
