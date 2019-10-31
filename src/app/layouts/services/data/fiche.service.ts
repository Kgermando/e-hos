import { Injectable } from '@angular/core';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore,
         AngularFirestoreDocument, CollectionReference, Query } from '@angular/fire/firestore';
import { Fiche } from '../models/fiche';
import { Filters } from '../models/filters';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  readonly path = 'Fiches';
  private ficheCollection: AngularFirestoreCollection<Fiche>;
  private ficheDoc: AngularFirestoreDocument<Fiche>;
  private fiche: Observable<Fiche>;

  constructor(private afs: AngularFirestore) {
    // this.ficheCollection = afs.collection<Fiche>(this.path, x => x.orderBy('Created', 'desc'));

    this.ficheCollection = this.afs.collection('Fiches', ref => ref.orderBy('Created', 'desc'));
   }

  add(data: Fiche) {
    return this.afs.doc<Fiche>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<Fiche>(`${this.path}/${id}`).delete();
  }

  update(data: Fiche) {
    return this.afs.doc<Fiche>(`${this.path}/${data.id}`).set(data).then((error => {
      console.log(error);
    }));
  }

  getCollection$(ref?: QueryFn): Observable<Fiche[]> {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afs.collection<Fiche>(this.path, ref => ref.orderBy('Created', 'asc'))
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Fiche;
          const id = data.id;
          return { id, ...data };
        });
      })
      );
  }

  getOneFiche(idFiche: string) {
    this.ficheDoc = this.afs.doc<Fiche>(`Fiches/${idFiche}`);
    return this.fiche = this.ficheDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Fiche;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  searchByTitle(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(switchMap(startText => {
        startText = startText.charAt(0).toUpperCase() + startText.slice(1);
        const endText = startText + '\uf8ff';
        const var1 = this.afs.collection('/Fiches', ref => ref
                    .orderBy('fullName')
                    .limit(10)
                    .startAt(startText)
                    .endAt(endText)
            )
            .snapshotChanges();
        const var2 = var1
            .pipe(debounceTime(500),
                distinctUntilChanged());
        const var3 = var2.pipe(
            map(changes => {
                return changes.map(c => {
                    return { key: c.payload.doc.id, ...c.payload.doc.data() };
                });
            }));
        return var3;
    }));
  }

  mapItems(item): Fiche {
    const doc = item.payload.doc || item.payload;

    const data = doc.data();
    const id = doc.id;
    const exists = doc.exists;

    return { id, exists, ...data };
  }

  filterCollection(filters: Filters): AngularFirestoreCollection<Fiche> {
    return this.afs.collection(this.path, ref => {
      let filtered: CollectionReference | Query = ref;

      if (filters.fullName) {
        filtered = filtered.where('fullName', '==', filters.fullName);
      }

      if (filters.start) {
        filtered = filtered.where('Created', '>=', filters.start);
      }

      if (filters.end) {
        filtered = filtered.where('Updated', '<=', filters.end);
      }

      return filtered;
    });
  }

}
