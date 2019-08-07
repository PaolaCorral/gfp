import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, Income } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersCollection: AngularFirestoreCollection<User>;
  private User: Observable<User[]>;
  private Income: Observable<Income[]>;
  public incomes: number;
  userId: string;

  constructor( private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.userId = user.uid; }
    })
    this.usersCollection = db.collection<User>('users');
    this.User = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }
   getUsers() {
     return this.User;
   }

   getUser() {
    return this.usersCollection.doc<User>(this.userId).valueChanges();
   }

   getIncomes() {
     return this.Income;
   }
   getIncome(id: string) {
     return this.usersCollection.doc<User>(this.userId).collection('income').doc<Income>(id).valueChanges();
   }

   updateIncome(income: Income, id: string) {
    /* this.incomes -= income.income; */
    
    this.usersCollection.doc(this.userId).update(this.incomes);
    return this.usersCollection.doc(this.userId).collection('income').doc(id).update(income);
   }
   addIncome(income: Income){
    /* this.incomes += income.income; */
    console.log(this.userId);
    /* this.usersCollection.doc(this.userId).update(this.incomes); */
    return this.usersCollection.doc(this.userId).collection('income').add(income);
   }

   removeIncome(id: string, income: Income) {
    this.incomes -= income.income;
    return this.usersCollection.doc(this.userId).collection('income').doc(id).delete();
   }
}
