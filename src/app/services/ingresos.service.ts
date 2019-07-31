import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingreso } from '../interfaces/interfaces';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private ingresosCollection: AngularFirestoreCollection<Ingreso>;
  private Ingresos: Observable<Ingreso[]>;

  constructor( private db: AngularFirestore) {
    this.ingresosCollection = db.collection<Ingreso>('ingresos');
    this.Ingresos = this.ingresosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data };
        });
      }
    ));
   }

   getIngresos(){
    return this.Ingresos;
   }

   getIngreso(id: string) {
     return this.ingresosCollection.doc<Ingreso>(id).valueChanges();
   }

   updateIngreso(ingreso: Ingreso, id: string) {
    return this.ingresosCollection.doc(id).update(ingreso);
   }

   addIngreso(ingreso: Ingreso) {
     return this.ingresosCollection.add(ingreso);
   }

   removeIngreso(id: string) {
     return this.ingresosCollection.doc(id).delete();
   }
}
