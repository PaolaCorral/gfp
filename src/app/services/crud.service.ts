import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, Income, Expense } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersCollection: AngularFirestoreCollection<User>;
  private User: Observable<User[]>;
  private incomesCollection: AngularFirestoreCollection<Income>;
  private Incomes: Observable<Income[]>;
  public totalIncomes: number;
  private expenseCollection: AngularFirestoreCollection<Expense>;
  private Expenses: Observable<Expense[]>;
  public userId: string;

  constructor( private db: AngularFirestore, private afAuth: AngularFireAuth) {

    // Obtiene el id del usuario concurrente
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        // Obtengo la coleccin de Ingresos con el ID dell usuario concurrente
        this.incomesCollection = db.collection<User>('users').doc(this.userId).collection('income');
        this.Incomes = this.incomesCollection.snapshotChanges().pipe(map(
          actions => {
            return actions.map(doc => {
              const data = doc.payload.doc.data();
              const id = doc.payload.doc.id;
              return {id, ...data};
            });
          }
        ));

        // Obtengo la coleccin de Egresos con el ID dell usuario concurrente
        this.expenseCollection = db.collection<User>('users').doc(this.userId).collection('expenses');
        this.Expenses = this.expenseCollection.snapshotChanges().pipe(map(
          actions => {
            return actions.map(doc => {
              const data = doc.payload.doc.data();
              const id = doc.payload.doc.id;
              return {id, ...data};
            });
          }
        ));
      }
    });

    // Obtengo la coleccion de usuarios ¿Util?
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
  // Funciones Crud de ingresos
  getIncomes() {
    return this.Incomes;
  }
  getIncome(id: string) {
    return this.usersCollection.doc(this.userId).collection('income').doc<Income>(id).valueChanges();
  }
  updateIncome(income: Income, id: string) {
  /* this.incomes -= income.income; */
  // this.usersCollection.doc(this.userId).update(income);
  return this.usersCollection.doc(this.userId).collection('income').doc(id).update(income);
  }
  addIncome(income: Income) {
  /* this.incomes += income.income; */
  /* this.usersCollection.doc(this.userId).update(this.incomes); */
  return this.usersCollection.doc<User>(this.userId).collection('income').add(income);
  }
  removeIncome(id: string) {
  // this.incomes -= income.income;
  return this.usersCollection.doc(this.userId).collection('income').doc(id).delete();
  }
  totalIncome() {
    /* this.totalIncomes = this.usersCollection.doc(this.userId) */

  }

  // Funciones CRUD de Egresos:
  getExpenses() {
    return this.Expenses;
  }
  getExpense(id: string) {
    return this.usersCollection.doc(this.userId).collection('expenses').doc<Expense>(id).valueChanges();
  }
  updateExpense(expense: Expense, id: string) { 
    return this.usersCollection.doc(this.userId).collection('expenses').doc(id).update(expense);
  }
  addExpense(expense: Expense) {
  return this.usersCollection.doc(this.userId).collection('expenses').add(expense);
  }
  removeExpense(id: string) {
    return this.usersCollection.doc(this.userId).collection('expenses').doc(id).delete();
  }
}
