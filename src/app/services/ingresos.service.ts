import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Income } from '../interfaces/interfaces';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private incomesCollection: AngularFirestoreCollection<Income>;
  private Incomes: Observable<Income[]>;

  constructor( private db: AngularFirestore) {
    this.incomesCollection = db.collection<Income>('incomes');
    this.Incomes = this.incomesCollection.snapshotChanges().pipe(map(
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
    return this.Incomes;
   }

   getIngreso(id: string) {
     return this.incomesCollection.doc<Income>(id).valueChanges();
   }

   updateIngreso(ingreso: Income, id: string) {
    return this.incomesCollection.doc(id).update(ingreso);
   }

   addIngreso(ingreso: Income) {
     return this.incomesCollection.add(ingreso);
   }

   removeIngreso(id: string) {
     return this.incomesCollection.doc(id).delete();
   }
}
